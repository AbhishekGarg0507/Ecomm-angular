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

export interface sellerLogin{
  email:string,
  password:string
}