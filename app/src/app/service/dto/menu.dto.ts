export class MenuDto {
  data: MenuObject[] = []

  constructor(role: number) {
    let myAccount;
    let post;
    let announcementsList;
    let logout;

    console.log(role)
    switch (role) {
      case 1:
        myAccount = new MenuObject('/my-account', 'Mi cuenta');
        post = new MenuObject('/search', 'Buscador de Cocheras');
        announcementsList = new MenuObject('/reservation', 'Listado de reserva');
        logout = new MenuObject('/logout', 'Cerrar sesión');
        this.data.push(myAccount)
        this.data.push(post)
        this.data.push(announcementsList)
        this.data.push(logout)
        break
      case 2:
        myAccount = new MenuObject('/my-account', 'Mi cuenta');
        post = new MenuObject('/publish', 'Publicar');
        announcementsList = new MenuObject('/list-advertisement', 'Listar Avisos activo');
        logout = new MenuObject('/logout', 'Cerrar sesión');
        this.data.push(myAccount)
        this.data.push(post)
        this.data.push(announcementsList)
        this.data.push(logout)
        break
      case 0:
        this.data.push(new MenuObject('/search', 'Buscador de Cocheras'))
        this.data.push(new MenuObject('/', 'Home'))
        break
    }
  }

  getData():MenuObject[] {
    return this.data
  }
}

export class MenuObject {
  href: string
  title: string

  constructor(href: string, title: string) {
    this.href = href;
    this.title = title;
  }
}


