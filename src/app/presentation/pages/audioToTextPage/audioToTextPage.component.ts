import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageBoxComponentFile, TextMessageEvent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { AudioToTextResponse } from '../../../interfaces/audio-to-text.response';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxComponent,
    TextMessageBoxComponentFile,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService)


  handleMessageWithFile({prompt, file}: TextMessageEvent){
    console.log(prompt, file);

    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, {isGpt: false, text: text}])

    this.openAiService.audioToText(file, text)
    .subscribe(res => this.handleResponse(res))


  }

  handleResponse(res: AudioToTextResponse | null){
    this.isLoading.set(false);
    if(!res)return;

    const text = `## Transcripción:
    __Duración:__ ${ Math.round( res.duration )} segundos.

    ## El texto es:
    ${ res.text }

    `
    this.messages.update(prev => [...prev, {isGpt: true, text: text}]);

    for (const segment of res.segments) {

      const segmentMessage = `__De ${ Math.round(segment.start) } a ${ Math.round( segment.end ) } segundos.__
      ${ segment.text }`;

      this.messages.update( prev => [...prev, {isGpt: true, text: segmentMessage}])

    }

  }
}
