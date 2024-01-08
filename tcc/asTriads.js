// import '@jscad/modeling'
const jscadModeling = require('@jscad/modeling')

const {
    generalize:generalise
} = jscadModeling.modifiers

// export default { asTriads }
module.exports = asTriads

const eps = 1e-4

/* export */
function asTriads(aGeom3) {
  const {polygons:jsPolygons,transforms} =
	generalise({triangulate: true}, aGeom3)

  const vertices = []

  const nearEnough = (u,v) => (
    (Math.abs(u[0]-v[0])
     + Math.abs(u[1]-v[1])
     + Math.abs(u[2]-v[2])
    ) < eps
  )

  const indexOfNearEnough = (u, V) => (
    [...Array(V.length).keys()].reduce(
      (i, j) => (
	(-1 < i) ? i : (
	  nearEnough(u, V[j])
	    ? j
	    : -1
	)
      ),
      -1
    )
  )

  const faces = jsPolygons.map(
    ({vertices:v3}) => (
      v3.map((v) => {
	let vi = indexOfNearEnough(v, vertices)

	if (vi === -1) 
	  vi = (vertices.push(v) - 1)
	// else
	//   console.log({vi})

	return vi
      })
    )
  )

  return {vertices, faces, transforms}
  
}
