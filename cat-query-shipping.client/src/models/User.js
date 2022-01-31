

export class User{
  constructor(data){
    this.name = data.name,
    this.email = data.email,
    this.id = data.id,
    this.picture = data.picture,
    this.grade = data.employeeGrade || data.grade
  }
}
