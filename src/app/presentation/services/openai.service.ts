import { Injectable } from '@angular/core';
import { audioToTextUseCase, createThreadUseCase, orthographyUseCase, postQuestionUseCase, prosConsStreamUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { Observable, from, of, tap } from 'rxjs';




@Injectable({providedIn: 'root'})
export class OpenAiService {

  checkOrthography(prompt: string){
    return from(orthographyUseCase(prompt));
  }

  checkProsCons(prompt: string){
    return from(prosConsUseCase(prompt));
  }

  ProsConsStream(prompt: string, abortSignal: AbortSignal){
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang:string){
    return from(translateUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice:string){
    return from(textToAudioUseCase(prompt, voice));
  }

  audioToText(audioFile: File, prompt?:string){
    return from(audioToTextUseCase(audioFile, prompt));
  }

  createThread():Observable<string>{

    if(localStorage.getItem('thread')){
      return of(localStorage.getItem('thread')!)
    }

    return from( createThreadUseCase() )
    .pipe(
      tap((threadId) => {
        console.log({threadId});
        localStorage.setItem('thread', threadId)
      })
    )

  }

  postQuestion(threadId: string, question: string){
    return from(  postQuestionUseCase(threadId, question) )
  }

}
