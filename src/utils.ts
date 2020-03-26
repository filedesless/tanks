export function hide_user_digits(username: string): string {
    return username.split('.').slice(0, -1).join('');
}
