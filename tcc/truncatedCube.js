// import '@jscad/modeling'

const jscadModeling = require('@jscad/modeling')

const {
  cube, cuboid, cylinder, cylinderElliptic,
  ellipsoid, geodesicSphere, roundedCuboid,
  roundedCylinder, sphere, torus
} = jscadModeling.primitives

const {
  scale, rotate, translate
} = jscadModeling.transforms

const {
  intersect, subtract, union
} = jscadModeling.booleans



// export default {
//   createClip,
//   getParameterDefinitions,
//   invRotateCubeOnEdge,
//   rotateCubeOnEdge,
//   createCubeOnEdge,
//   createTruncatedCube,
// }

module.exports = {
  createClip,
  getParameterDefinitions,
  invRotateCubeOnEdge,
  rotateCubeOnEdge,
  createCubeOnEdge,
  createTruncatedCube,
}

/* export */
function createClip(h=0) {
  let CLIP = cube()
  
  CLIP = scale([2,2,2], CLIP)
  CLIP = translate([0,0,2+h], CLIP)

  CLIP = invRotateCubeOnEdge({}, CLIP)
  
  return CLIP
}

/* export */
function createTruncatedCube(t=0) {
  t = Math.max(0, Math.min(1, t))
  t = (1-t) * 2*Math.sqrt(3)
  // let _cube = createCube()
  let _cube = translate([1,1,1], cube())
  let _clip = createClip(t)
  //return _clip

  return scale(
    [0.5, 0.5, 0.5],
    subtract(_cube, _clip),
  )
}

/* export */
function createCubeOnEdge() {
  let pX,pY,pZ=pY=pX=0
  let CUBE = cube()
  CUBE = rotateCubeOnEdge({}, CUBE)
  
  pZ = Math.sqrt(3)
  CUBE = translate([pX,pY,pZ], CUBE)

  return CUBE
}

/* export */
function rotateCubeOnEdge(options, geom) {
  let tX,tY,tZ=tY=tX=0
  
  tZ = Math.PI/4
  geom = rotate([tX,tY,tZ], geom)
  
  tZ = 0
  tY = Math.atan2(Math.SQRT2, 1)
  geom = rotate([tX,tY,tZ], geom)

  return geom
}

/* export */
function invRotateCubeOnEdge(options, geom)  {
  // options = {
  //   scaleFactor: 1,
  //   ...options,
  // }
  options = Object.assign({
    scaleFactor: 1,
  }, options)
  const {scaleFactor: s} = options
  let tX,tY,tZ=tY=tX=0

  tY = Math.atan2(Math.SQRT2, 1)
  geom = rotate([tX,tY,tZ], geom)

  tY = 0
  tZ = Math.PI/4
  geom = rotate([tX,tY,tZ], geom)

  return geom
}

/* export */
function getParameterDefinitions () {
  return [
    {
      name: 'truncationParam',
      type: 'number',
      initial: 0.2,
      min: 0.0,
      max: 1.0,
      step: 0.005,
      caption: 'Truncation Factor:'
    },
  ]
}
