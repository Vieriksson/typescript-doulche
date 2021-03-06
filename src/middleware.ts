export const exampleMiddleware = (_, __, next) => {
  console.log('Den här körs varje gång någon anrop en endpoint där jag får vara med')
  next()
}
