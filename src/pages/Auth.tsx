import React from 'react'
import { useParams } from "react-router-dom";

export default function Auth() {

  const {type} = useParams();

  return (
    <div>Auth: {type}</div>
  )
}
