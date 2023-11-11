import "./Tag.css"

function Tag(props) {
 const colour = props.colour
 const colourWithTransparency = addOpacity(props.colour, 0.2)
 const theStyle = {
  "--beforeColour": colourWithTransparency,
  "backgroundColor": colourWithTransparency,
  "color": colour
 }

 function addOpacity(colour, opacity) {
  let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return colour + _opacity.toString(16).toUpperCase();
 }

 return (
  <div className="Tag-Container">
   <div className="Tag" style={theStyle}><b>{props.name}</b></div>
  </div>
 )
}
export default Tag 