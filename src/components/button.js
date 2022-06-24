import propTypes from 'prop-types'




const button = ({color, Text, onClick}) => {

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'>
      {Text}
    </button>
  )
}


button.defaultProps = {
  color: 'steelblue'
}

button.propTypes = {
  Text: propTypes.string,
  color: propTypes.string,
  onClick: propTypes.func,
}


export default button