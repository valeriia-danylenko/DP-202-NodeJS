function ipsBetween(...ips) {

  const ipArray = ips.map(el => el.split('.'))
  const [ip1, ip2] = ipArray;
  const differenceArray = ip2.map((el,i) => {
    return el-ip1[i]
  })
  differenceArray.reverse()
  const result = differenceArray.reduce((acc, el, i) => {
    acc += el * (Math.pow(256, i))
    return acc
  }, 0)
  return result
}

console.log(ipsBetween("10.0.0.0", "10.0.0.50"));
console.log(ipsBetween("10.0.0.0", "10.0.1.0"));
console.log(ipsBetween("20.0.0.10", "20.0.1.0"));
