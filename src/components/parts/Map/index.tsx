import { LatLngExpression } from 'leaflet'
import L from 'leaflet'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, useMap, Marker } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

import useSupercluster from 'use-supercluster'

import { selectAllUnits, selectUnitById } from '../../../app/api/loyaBackendAPI'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Unit as UnitCollection, UnitId } from '../../../app/reducers/collectionsReducer'
import { Unit as UnitModel } from '../../../app/reducers/collectionsReducer'
import { selectCurrentObjectId, setSearchParams } from '../../../app/reducers/dataReducer'

import { selectPointByObjectId, selectPoints } from '../../../app/reducers/pointsReducer'
import { setPoint } from '../../../app/reducers/pointsReducer'
import { Point, PositionReq } from '../../../schema/position_pb'
import { PositionClient } from '../../../schema/PositionServiceClientPb'
import DriftMarker from '../DriftMarker'

import styles from './Map.module.scss'

const MapActions = () => {
    const dispatch = useAppDispatch()

    const currentObjectId = useAppSelector(selectCurrentObjectId)
    const currentObject = useAppSelector((state) => selectUnitById(state, currentObjectId))
    const currentObjectPoint = useAppSelector((state) => selectPointByObjectId(state, currentObject?.device?.hw_id))

    let timerId: any

    const map = useMapEvents({
        moveend: () => {
            if (timerId) {
                clearTimeout(timerId)
            }

            const center = map.getCenter()
            const bounds = map.getBounds()
            const zoom = map.getZoom()

            const northWest = bounds.getNorthWest()
            const southEast = bounds.getSouthEast()

            const box = {
                left_top: {
                    lat: northWest.lat,
                    lon: northWest.lng,
                },
                right_bottom: {
                    lat: southEast.lat,
                    lon: southEast.lng,
                },
            }

            if (!currentObjectPoint) {
                timerId = setTimeout(() => {
                    dispatch(setSearchParams({ box }))
                }, 300)
            }

            localStorage.setItem('center', JSON.stringify(center))
            localStorage.setItem('zoom', JSON.stringify(zoom))
            localStorage.setItem('box', JSON.stringify(box))
        },
    })

    useEffect(() => {
        const boxString = localStorage.getItem('box')
        const box = boxString ? JSON.parse(boxString) : undefined

        dispatch(setSearchParams({ box }))

        return () => {
            dispatch(setSearchParams({ box: null }))
        }
    })

    return null
}

const icons: any = {}
const fetchIcon = (count: number, size: number) => {
    if (!icons[count]) {
        icons[count] = L.divIcon({
            html: `<div class="${styles.cluster}" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
            className: styles.clusterWrapper,
        })
    }
    return icons[count]
}

type MarkersProps = {
    useClusters: boolean
}

const Markers = ({ useClusters }: MarkersProps) => {
    const map = useMap()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const currentObjects = useAppSelector(selectAllUnits)

    const currentObjectId = useAppSelector(selectCurrentObjectId)
    const currentObject = useAppSelector((state) => selectUnitById(state, currentObjectId))
    const currentObjectPoint = useAppSelector((state) => selectPointByObjectId(state, currentObject?.device?.hw_id))

    const points = useAppSelector(selectPoints)?.map((point) => ({
        type: 'Feature',
        properties: { cluster: false, pointId: point.deviceId },
        geometry: {
            type: 'Point',
            coordinates: [point.longitude, point.latitude],
        },
    }))

    const objectsMap: any = {}

    currentObjects.forEach(({ id, icon, visible_name, device: { hw_id } }: UnitCollection) => {
        objectsMap[hw_id] = { id, icon, visible_name }
    })

    const { clusters } = useSupercluster({
        points: points || [],
        bounds: [
            map.getBounds().getSouthWest().lng,
            map.getBounds().getSouthWest().lat,
            map.getBounds().getNorthEast().lng,
            map.getBounds().getNorthEast().lat,
        ],
        zoom: map.getZoom(),
        options: { radius: 60, maxZoom: 18 },
    })

    useEffect(() => {
        let stream: any = undefined

        const client = new PositionClient(process.env.REACT_APP_GRPC || '')

        if (currentObjectId) {
            const currentObject = currentObjects.find(({ id }: UnitModel) => id === currentObjectId)

            if (currentObject) {
                const request = new PositionReq()

                request.setUnitIdsList([currentObject.device.hw_id])

                stream = client.streaming(request)

                stream.on('data', (point: Point) => {
                    dispatch(setPoint(point.toObject()))
                })
            }
        } else if (currentObjects) {
            const request = new PositionReq()
            request.setUnitIdsList(currentObjects.map(({ device: { hw_id } }: any) => hw_id))

            stream = client.streaming(request)

            stream.on('data', (point: Point) => {
                dispatch(setPoint(point.toObject()))
            })
        }

        return () => {
            stream && stream.cancel()
        }
    }, [dispatch, currentObjectId, currentObjects])

    useEffect(() => {
        if (map) {
            if (currentObjectPoint) {
                map.setView([currentObjectPoint.latitude, currentObjectPoint.longitude], map.getZoom())
            }

            setTimeout(() => {
                map.invalidateSize(true)
            }, 300)
        }
    }, [currentObjectId, currentObjectPoint, map])

    const setCurrent = (objectId: UnitId) => {
        if (currentObjectId === objectId) {
            navigate(`.`)
        } else {
            navigate(`./${objectId}`)
        }
    }

    if (!currentObjects) {
        return null
    }

    if (currentObjectId && currentObject) {
        return (
            <DriftMarker
                objectId={currentObject.id}
                hwId={Number(currentObject.device.hw_id)}
                iconName={currentObject.icon}
                name={currentObject.visible_name}
                onClick={setCurrent}
            />
        )
    }

    if (useClusters) {
        return (
            <>
                {clusters.map((cluster) => {
                    const [longitude, latitude] = cluster.geometry.coordinates

                    const { cluster: isCluster, point_count: pointCount, pointId } = cluster.properties

                    if (isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                position={[latitude, longitude]}
                                icon={fetchIcon(pointCount, 30 + (pointCount / (points?.length || 1)) * 10)}
                            />
                        )
                    }

                    const object = objectsMap[pointId]

                    if (!object) {
                        return null
                    }

                    return (
                        <DriftMarker
                            key={`${object.id}_${pointId}`}
                            objectId={object.id}
                            hwId={Number(pointId)}
                            iconName={object.icon}
                            name={object.visible_name}
                            onClick={setCurrent}
                        />
                    )
                })}
            </>
        )
    }

    return (
        <>
            {currentObjects.map(({ id, icon, visible_name, device: { hw_id } }: UnitCollection) => {
                return (
                    <DriftMarker
                        key={`${id}_${hw_id}`}
                        objectId={id}
                        hwId={Number(hw_id)}
                        iconName={icon}
                        name={visible_name}
                        onClick={setCurrent}
                    />
                )
            })}
        </>
    )
}

export default function Map() {
    const [useClusters, setUseClusters] = useState<boolean>(true)
    const [useCoordinates, setUseCoordinates] = useState<boolean>(true)

    const [center] = useState<LatLngExpression | undefined>(
        JSON.parse(localStorage.getItem('center') || '[55.7522, 37.6156]'),
    )
    const [zoom] = useState<number>(Number(JSON.parse(localStorage.getItem('zoom') || '6')))

    const dispatch = useAppDispatch()

    const handleCoordinatesSwitch = () => {
        setUseCoordinates(!useCoordinates)
        dispatch(setSearchParams({ useCoordinates: !useCoordinates }))
    }

    return (
        <div className={styles.map}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '100vh' }}
                zoomControl={true}
            >
                <MapActions />

                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                <div className={styles.controls}>
                    <div
                        className={styles.control}
                        onClick={() => {
                            setUseClusters(!useClusters)
                        }}
                    >
                        {useClusters ? 'Выключить кластеризацию' : 'Включить кластеризацию'}
                    </div>

                    <div className={styles.control} onClick={handleCoordinatesSwitch}>
                        {useCoordinates ? 'Выключить поиск по координатам' : 'Включить поиск по координатам'}
                    </div>
                </div>

                <Markers useClusters={useClusters} />
            </MapContainer>
        </div>
    )
}
