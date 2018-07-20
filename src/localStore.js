export function save(key,val){
  localStorage.setItem(key,JSON.stringify(val));
}

export function load(key){
  return JSON.parse(localStorage.getItem(key))
}