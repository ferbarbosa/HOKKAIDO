import React from 'react'

interface Props {
    color:string;
    size:number;
    type:string;
};

const Divider: React.FC<Props> = ({color, size, type}) => {
  return (
    <hr
        style={{
            borderTop: type,
            borderTopColor: color,
            borderTopWidth: size,
        }}
    />
  )
}

export default Divider;
