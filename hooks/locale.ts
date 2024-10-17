"use server"
import { cookies } from "next/headers";

  
export async function getLocal() {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('locale');
  
  if (localeCookie) {
    try {
      const locale = JSON.parse(localeCookie.value);
      // console.log(userData)
      return locale;
    } catch (error) {
      console.error('Error parsing locale cookie:', error);
    }
  }
  return "en";
}
export async function setLocal(locale:"en"|"ar") {
  const cookieStore = cookies();
 cookieStore.set('locale',locale);
}
