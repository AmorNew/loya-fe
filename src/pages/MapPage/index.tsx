import React, {useEffect} from 'react';

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import Object from '../../components/parts/Object';
import Map from '../../components/parts/Map';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectCurrentObjectId } from '../../app/reducers/dataReducer';

import { PositionClient } from '../../schema/PositionServiceClientPb';
import { Point, Unit } from '../../schema/position_pb';
import { Unit as UnitModel } from '../../app/reducers/collectionsReducer';

import { selectAllUnits, useFilterUnitsQuery } from '../../app/api/loyaBackendAPI';
import { setPoint } from '../../app/reducers/pointsReducer';

import './styles.css';

export default function MapPage() {
  const dispatch = useAppDispatch();

  const currentObjectId = useAppSelector(selectCurrentObjectId);
  
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
} = useFilterUnitsQuery('');

const currentObjects = useAppSelector(selectAllUnits);

  useEffect(() => {
      let stream: any = undefined;
      
      const client = new PositionClient(process.env.REACT_APP_GRPC || '');
      
      if (currentObjectId) {
        const currentObject = currentObjects.find(({id}: UnitModel) => id === currentObjectId);
        
        if (currentObject) {
          const request = new Unit();

          request.setObjectIdsList([currentObject.device.hw_id]);    
          
          stream = client.streaming(request);

          stream.on('data', (point: Point) => {

            dispatch(setPoint(point.toObject()));

            // console.log(point.toObject());
          });
        }

      } else if (currentObjects) {
        const request = new Unit();
        request.setObjectIdsList(currentObjects.map(({device: {hw_id}}: any) => hw_id));    
        
        stream = client.streaming(request);

        stream.on('data', (point: Point) => {

          dispatch(setPoint(point.toObject()));

          // console.log(point.toObject());
        });
      }

    return () => {
      stream && stream.cancel();
    };
  }, [dispatch, currentObjectId, currentObjects])

  return(
    <div className="page-layout">
      <SideBar />

      <ObjectList />

      <Object />

      <Map />
    </div>
  );
}