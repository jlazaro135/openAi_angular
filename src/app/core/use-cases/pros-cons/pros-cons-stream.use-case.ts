import { environment } from "environments/environment";


export async function* prosConsStreamUseCase(prompt: string, abortSignal: AbortSignal){

  try{
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({prompt}),
      signal: abortSignal
    })

    if( !resp.ok ) throw new Error('No se puedo realizar la comparación');

    const reader = resp.body?.getReader();

    if(!reader){
      console.log('no se pudo generar el reader');
      throw new Error('No se pudo generar el reader')
    }

    const decoder = new TextDecoder();
    let text = '';

    while(true){
      const { value, done } = await reader.read();

      if( done ){
        break;
      }

      const decodenChunk = decoder.decode( value, {stream: true} );
      text += decodenChunk;
      yield text

    }

    return text

  }catch(error){
    return null
  }




}
