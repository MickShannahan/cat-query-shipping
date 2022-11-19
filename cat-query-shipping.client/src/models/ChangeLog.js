

export class Changelog {

  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.date = new Date(data.merged_at)
    this.body = data.body
    this.link = data.html_url
  }
}
