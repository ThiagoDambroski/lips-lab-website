import React from 'react'

type LibsCardsType = {
    number:number,
    title:string,
    desc:string
}

function LibsCards({number,title,desc}:LibsCardsType) {
  return (
    <div>
        {number}
        {title}
        {desc}
    </div>
  )
}

export default LibsCards