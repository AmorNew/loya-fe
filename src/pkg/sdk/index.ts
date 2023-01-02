import { Configuration, V0alpha2Api } from '@ory/client'

export default new V0alpha2Api(
    new Configuration({
        basePath: process.env.REACT_APP_AUTH_URL,
        baseOptions: { withCredentials: true },
    }),
)
