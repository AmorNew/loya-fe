import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";


import {
  SelfServiceLoginFlow,
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRecoveryFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceSettingsFlowBody,
  SubmitSelfServiceVerificationFlowBody,
  UiNode,
} from "@ory/client"

import { getNodeId } from "@ory/integrations/ui"
import { isUiNodeInputAttributes } from "@ory/integrations/ui"

import ory from "../../pkg/sdk"


import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';

import './styles.css';


export default function LoginPage({setHasSession}: {setHasSession: (arg0: boolean) => void}) {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const [values, setValues] = useState<any>({})

  const navigate = useNavigate();

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

    // Prevent double submission!
    // if (this.state.isLoading) {
    //   return Promise.resolve()
    // }

    // this.setState((state) => ({
    //   ...state,
    //   isLoading: true,
    // }))

    return onSubmit(values).finally(() => {})
  }

  const onSubmit = (values: SubmitSelfServiceLoginFlowBody) => {
    return ory
      .submitSelfServiceLoginFlow(String(flow?.id), {...values, method: 'password'})
      .then(() => {
        setHasSession(true);
        navigate("/")
      })
      .catch((err) => {
        console.error('error', err);
      });
  }
 

  if (!flow) {
    return <div>loading...</div>
  }

  return(
    <div className="formWrapper">
      <div className="formHead">
        <div className="logo"><Logo className="login-logo-icon" />LOYA</div>
        <div className="phone">+7 (495) 108-16-03</div>
      </div>
      <form 
        className="form" 
        onSubmit={handleSubmit}
        action={flow.ui.action}
        method={flow.ui.method}  
      >
        <h2>Вход</h2>
        
        {flow.ui.nodes.map((node, i) => {
          const id = getNodeId(node);
          
          if (isUiNodeInputAttributes(node.attributes) && node.attributes.type === 'submit') {
            return <Button key={`${id}-${i}`}  type="submit">Войти</Button>
          }

          return(
              <Input 
                key={`${id}-${i}`} 
                labelText={node.meta?.label?.text} 
                {...node.attributes} 
                value={values[id as any]}
                onChange={(value: any, e: any) => {
                  return setValues((prevState: any) => {
                    return ({...prevState, [e.target.name]: value});
                  })
                }} 
              /> 
          );
        })}
      </form>
    </div>
  );
}