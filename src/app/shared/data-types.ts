export interface sellerSignup{
      username: string,
      phone: number,
      email: string,
      zipcode: number,
      gender: string,
      address:string,
      password: string,
      confirmPassword: string 
}
export interface userSignup{
      username: string,
      phone: number,
      email: string,
      zipcode: number,
      gender: string,
      address:string,
      password: string,
      confirmPassword: string 
}

export interface sellerLogin{
  email:string,
  password:string
}
export interface userLogin{
  email:string,
  password:string
}

export interface product{
  productName:string,
  productPrice:number,
  productCategory:string,
  color:string,
  description:string,
  image:string,
  id:number,
  quantity:number | undefined,
  productId:undefined| number
}

export interface cart{
  productName:string,
  productPrice:number,
  productCategory:string,
  color:string,
  description:string,
  image:string,
  id:number | undefined,
  quantity:number | undefined,
  userId:number,
  productId:number
}