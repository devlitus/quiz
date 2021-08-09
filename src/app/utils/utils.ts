import Swal from 'sweetalert2';

export class Utils {
  setLocalStorage(user: object) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

}
export class Alert {
  alertCustom(title: string, error: string, icon: any) {
    return Swal.fire({
      title: title,
      text: error,
      icon: icon,
    });
  }
}
