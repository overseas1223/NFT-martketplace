import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import Header from "../components/Header"
import { NOTIFICATION_INITIAL } from "../redux/type"
import 'react-notifications/lib/notifications.css'

const Layout = ({ child }) => {
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { notification } = main

  useEffect(() => {
    if(notification.notify) {
      if(notification.type === "error") NotificationManager.error(notification.text, 'Error', 3000)
      if(notification.type === "success") NotificationManager.success(notification.text, 'Success', 3000)
      dispatch({ type: NOTIFICATION_INITIAL })
    }
  }, [notification, dispatch])

  return (
    <div>
      <NotificationContainer />
      <Header />
      <div style={{ marginTop: '100px' }}>
        {child}
      </div>
    </div>
  )
}

export default Layout