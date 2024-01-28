import type { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment.development"

export const prosConsUseCase = async ( prompt:string ) => {

  try{

    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({prompt})
    })

    if( !resp.ok ) throw new Error('No se puedo realizar la comparación');

    const data = await resp.json() as ProsConsResponse;

    return {
      ok: true,
      ...data
    }

  }catch(error){
    console.log(error)
    return {
      ok: false,
      role: '',
      content: 'No se puedo realizar la comparación'
    }
  }


}