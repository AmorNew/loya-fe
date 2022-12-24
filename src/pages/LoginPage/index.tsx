import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import cn from 'classnames';

import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
  UiNodeInputAttributes,
} from "@ory/client"

import { getNodeId } from "@ory/integrations/ui"
import { isUiNodeInputAttributes } from "@ory/integrations/ui"

import ory from "../../pkg/sdk"

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';

import { useDispatch } from 'react-redux';
import { setIdentity } from '../../app/reducers/userReducer';

import styles from './LoginPage.module.scss';


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const [values, setValues] = useState<any>({})

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!flow) {
      ory
        .initializeSelfServiceLoginFlowForBrowsers()
        .then(({ data }) => {
          setFlow(data)
        })
        .catch((err) => {
          console.error('error', err);
        });
    }
        
    if (flow) {
      const newValues: any = {};

      flow.ui.nodes.forEach((node) => {
        // This only makes sense for text nodes
        if (isUiNodeInputAttributes(node.attributes)) {
          if (
            node.attributes.type === "button" ||
            node.attributes.type === "submit"
          ) {
            // In order to mimic real HTML forms, we need to skip setting the value
            // for buttons as the button value will (in normal HTML forms) only trigger
            // if the user clicks it.
            return
          }

          newValues[node.attributes.name as string] = node.attributes.value
        }
      });

      setValues(newValues);
    }
  }, [flow, navigate]);

  const handleSubmit = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    if (isLoading) {
      return Promise.resolve()
    }

    setIsLoading(true);

    return onSubmit(values).finally(() => {})
  }

  const onSubmit = (values: SubmitSelfServiceLoginFlowBody) => {
    return ory
      .submitSelfServiceLoginFlow(String(flow?.id), {...values, method: 'password'})
      .then(({data}) => {
        console.log('login data', data);
        
        dispatch(setIdentity(data.session.identity));

        navigate("/map")
      })
      .catch((err) => {
        console.error('error', err);

        setIsLoading(false);
      });
  }
 

  if (!flow) {
    return <div>loading...</div>
  }

  return(
    <div className={styles.formWrapper}>
      <div className={styles.formHead}>
        <div className={styles.logo}>
          <Logo className={styles['login-logo-icon']} />
          LOYA
        </div>

        <div className={styles.phone}>+7 (495) 108-16-03</div>
      </div>
      <form 
        className={cn(styles.form, {[styles.loading]: isLoading})}
        onSubmit={handleSubmit}
        action={flow.ui.action}
        method={flow.ui.method}  
      >
        <h2>Вход</h2>
        
        {flow.ui.nodes.map((node, i) => {
          const id = getNodeId(node);
          
          if (isUiNodeInputAttributes(node.attributes) && node.attributes.type === 'submit') {
            return <Button key={`${id}-${i}`} type="submit">Войти</Button>
          }

          return(
              <Input 
                key={`${id}-${i}`} 
                labelText={node.meta?.label?.text} 
                {...node.attributes} 
                defaultValue={values[id as any] || ''}
                onChange={(value: any) => {
                  return setValues((prevState: any) => {
                    const {name = ""} = node.attributes as UiNodeInputAttributes;

                    return ({...prevState, [name]: value});
                  })
                }} 
              /> 
          );
        })}
      </form>
    </div>
  );
}