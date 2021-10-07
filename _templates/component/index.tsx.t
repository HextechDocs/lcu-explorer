---
    to: renderer/components/<%= h.capitalize(name) %>/index.tsx
---
import Styled from './assets/Styled'

import Props from '@Interfaces/components/<%= h.capitalize(name) %>/props'

const <%= h.capitalize(name) %> = ({}: Props): JSX.Element => {
    return (
    <Styled>
        Content
    </Styled>
    )
}

export default <%= h.capitalize(name) %>
