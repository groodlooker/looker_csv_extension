import React, { useContext } from "react"
import { Heading, Box } from "@looker/components"
import styled from "styled-components"
import { ExtensionButton } from "../ExtensionButton"
import { ApiFunctionsProps } from "./types"
import {
  ExtensionContext,
  ExtensionContextData
} from "@looker/extension-sdk-react"
import { ExtensionHostApi } from "@looker/extension-sdk"

export const ApiFunctions: React.FC<ApiFunctionsProps> = () => {
  const [messages, setMessages] = React.useState("")
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const extensionHost = extensionContext.extensionSDK as ExtensionHostApi

  const updateMessages = (message: string) => {
    setMessages(prevMessages => {
      const maybeLineBreak = prevMessages.length === 0 ? '' : '\n'
      return `${prevMessages}${maybeLineBreak}${message}`
    })
  }

  const buttonClick = () => {
    extensionHost
      .verifyHostConnection()
      .then(value => {
        if (value === true) {
          updateMessages("Host verification success")
        } else {
          updateMessages("Invalid response " + value)
        }
      })
      .catch(error => {
        updateMessages("Host verification failure")
        updateMessages(error)
        console.error("Host verification failure", error)
      })
  }

  const updateTitleButtonClick = () => {
    const date = new Date()
    extensionHost.updateTitle(
      `Extension Title Update ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    )
    updateMessages("Title updated")
  }

  const goToBrowseButtonClick = () => {
    extensionHost.updateLocation("/browse")
  }

  const goToMarketplaceButtonClick = () => {
    extensionHost.updateLocation("/marketplace")
  }

  const openMarketplaceButtonClick = () => {
    extensionHost.openBrowserWindow("/marketplace", "_marketplace")
    updateMessages("Window opened")
  }

  const localStorageSet = () => {
    extensionHost
      .localStorageSetItem("testbed", new Date().toString())
      .then(() => {
        updateMessages("Success")
      })
      .catch(error => {
        updateMessages(error)
        console.error(error)
      })
  }

  const localStorageGet = () => {
    extensionHost
      .localStorageGetItem("testbed")
      .then(value => {
        updateMessages(value || "null")
      })
      .catch(error => {
        updateMessages(error)
        console.error(error)
      })
  }

  const localStorageRemove = () => {
    extensionHost
      .localStorageRemoveItem("testbed")
      .then(() => {
        updateMessages("Success")
      })
      .catch(error => {
        updateMessages(error)
        console.error(error)
      })
  }

  const clearMessagesClick = () => {
    setMessages('')
  }

  return (
    <>
      <Heading my="xlarge">API Functions</Heading>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" width="50%">
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={updateTitleButtonClick}
          >
            Update title
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={goToBrowseButtonClick}
          >
            Go to browse (update location)
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={goToMarketplaceButtonClick}
          >
            Go to Marketplace (update location)
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={openMarketplaceButtonClick}
          >
            Open marketplace new window
          </ExtensionButton>
          <ExtensionButton mt="small" variant="outline" onClick={buttonClick}>
            Verify host connection
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={localStorageSet}
          >
            Set local storage
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={localStorageGet}
          >
            Get local storage
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={localStorageRemove}
          >
            Remove local storage
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={clearMessagesClick}
          >
            Clear messages
          </ExtensionButton>
        </Box>
        <Box width="50%" pr="large">
          <StyledPre>{messages}</StyledPre>
        </Box>
      </Box>
    </>
  )
}

const StyledPre = styled.pre`
  margin: 0 0 0 20px;
  border: 1px solid #c1c6cc;
  height: 100%;
  padding: 20px;
`
