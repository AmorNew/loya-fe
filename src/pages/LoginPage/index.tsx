import { SelfServiceLoginFlow, SubmitSelfServiceLoginFlowBody, UiNodeInputAttributes } from '@ory/client'
import { getNodeId, isUiNodeInputAttributes } from '@ory/integrations/ui'

import cn from 'classnames'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setIdentity } from '../../app/reducers/userReducer'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Logo from '../../components/ui/Logo'
import ory from '../../pkg/sdk'

import styles from './LoginPage.module.scss'

const FIELD_NAMES: any = {
    identifier: 'Логин',
    password: 'Пароль',
}

export default function LoginPage(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [flow, setFlow] = useState<SelfServiceLoginFlow>()
    const [values, setValues] = useState<any>({})
    const [errors, setErrors] = useState<any>({})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (flow == null) {
            ory.initializeSelfServiceLoginFlowForBrowsers()
                .then(({ data }) => {
                    setFlow(data)
                })
                .catch((err) => {
                    console.error('error', err)
                })
        }

        if (flow != null) {
            const newValues: any = {}

            flow.ui.nodes.forEach((node) => {
                // This only makes sense for text nodes
                if (isUiNodeInputAttributes(node.attributes)) {
                    if (node.attributes.type === 'button' || node.attributes.type === 'submit') {
                        // In order to mimic real HTML forms, we need to skip setting the value
                        // for buttons as the button value will (in normal HTML forms) only trigger
                        // if the user clicks it.
                        return
                    }

                    newValues[node.attributes.name] = node.attributes.value
                }
            })

            setValues(newValues)
        }
    }, [flow, navigate])

    const handleSubmit = async (e: any): Promise<void> => {
        e.stopPropagation()
        e.preventDefault()

        if (isLoading) {
            return await Promise.resolve()
        }

        setIsLoading(true)

        return await onSubmit(values).finally(() => {})
    }

    const onSubmit = async (values: SubmitSelfServiceLoginFlowBody): Promise<void> =>
        ory
            .submitSelfServiceLoginFlow(String(flow?.id), {
                ...values,
                method: 'password',
            })
            .then(({ data }) => {
                dispatch(setIdentity(data.session.identity))

                navigate('/map')
            })
            .catch((err) => {
                console.error('error', err)

                setIsLoading(false)

                setErrors({
                    main: true,
                    identifier: 'Не верно введён логин',
                    password: 'Не верно введён пароль',
                })
            })

    if (flow == null) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.formWrapper}>
            <div className={styles.formHead}>
                <div className={styles.logo}>
                    <Logo className={styles['login-logo-icon']} />
                    LOYA
                </div>

                <div className={styles.phone}>+7 (495) 108-16-03</div>
            </div>
            <form
                className={cn(styles.form, { [styles.loading]: isLoading })}
                onSubmit={(e) => {
                    void handleSubmit(e)
                }}
                action={flow.ui.action}
                method={flow.ui.method}
            >
                <div className={styles.header}>
                    <h2>Вход</h2>

                    {Boolean(errors.main) && (
                        <div className={styles.error}>
                            Если вы забыли логин или пароль
                            <br />
                            обратитесь по номеру: +7 (495) 108-16-03
                        </div>
                    )}
                </div>

                {flow.ui.nodes.map((node, i) => {
                    const id = getNodeId(node)

                    if (isUiNodeInputAttributes(node.attributes) && node.attributes.type === 'submit') {
                        return (
                            <Button key={`${id}-${i}`} type='submit'>
                                Войти
                            </Button>
                        )
                    }

                    const value = values[id]
                    const { name = '' } = node.attributes as UiNodeInputAttributes

                    return (
                        <Input
                            key={`${id}-${i}`}
                            labelText={FIELD_NAMES[name]}
                            {...node.attributes}
                            defaultValue={value}
                            error={Boolean(errors[name])}
                            errorText={errors[name]}
                            onFocus={() => {
                                if ((errors[name] as string).length > 0) {
                                    setErrors((prevErrors: any) => ({
                                        ...prevErrors,
                                        [name]: undefined,
                                    }))
                                }
                            }}
                            onChange={(value: any) => setValues((prevState: any) => ({ ...prevState, [name]: value }))}
                        />
                    )
                })}
            </form>
        </div>
    )
}
