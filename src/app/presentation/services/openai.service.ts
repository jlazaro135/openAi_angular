import { Injectable } from '@angular/core';
import { audioToTextUseCase, orthographyUseCase, prosConsStreamUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { from } from 'rxjs';




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

}
