import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxComponentFile, TextMessageBoxEvent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';



@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxComponent,
    TextMessageBoxComponentFile,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {


  public messages = signal<Message[]>([{text: 'Hola Mundo', isGpt: true}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService)

  // handleMessage(prompt: string){
  //   console.log(prompt, file)
  // }


  // handleMessageWithFile({prompt, file}: TextMessageEvent){
  //   console.log(prompt, file)
  // }

  handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
    console.log(prompt, selectedOption)
  }

 }
