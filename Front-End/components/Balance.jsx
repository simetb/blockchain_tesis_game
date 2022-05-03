import React from 'react'

export default function Balance( {balance} ) {
  return (
    <span>ETH Balance: {Number(balance).toFixed(4)}</span>
  )
}
