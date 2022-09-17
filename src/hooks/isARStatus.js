import { useEffect, useState } from "react"

export const useARStatus = (data) => {
  const [isSupport, SetSupport] = useState(false)

  const update = (result) => {
    SetSupport(result)
  }

  useEffect(() => {
    let src = data.split('.')
    if (src[src.length - 1] === "glb") update(true)
  }, [isSupport, data])

  return isSupport
}

