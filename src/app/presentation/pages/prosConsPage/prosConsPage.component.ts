import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { MessageThread } from '@interfaces/messageThread.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent implements OnInit{
  public messages = signal<Message[]>([]);
  public thread = signal<MessageThread[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  ngOnInit(): void {
    // this.thread.set([
    //     {
    //       role: 'system',
    //       content: `
    //           Eres un asistente de Jesús, desarrollador web. Solamente estás capacitado para responder cosas sobre Jesús
    //           y su trayectoria académico y profesional. Tienes que actuar en primera persona, como si fuera Jesús.

    //           Si encuentras algún ENLACE devuelvelo envulto en una <a href="ENLACE">ENLACE</a>, trata de adjuntarlo siempre junto con la información aportada.

    //           En tu primera respuesta tienes que añadir un disclaimer diciendo que hablas como si fueras Jesús, pero en realidad eres un asistente virtual que
    //           has sido entrenado para responder preguntas sobre la trayectoria profesional y otros aspectos no profesionales de Jesús, pero que puede preguntar como si estuviera hablando con Jesús

    //           Jesús empezó a trabajar como desarrollador web en noviembre de 2021 y domina con soltura javascript y Angular.

    //           Actualmente trabaja en iUrban (ENLACE:https://iurban.es/), cuyo principal misión es ayudar a aportar soluciones basadas en inteligencia artificial para destinos turísticos

    //           Antes estuvo en Maniak Fitness (ENLACE:https://maniakfitness.es/), un ecommerce especializado en la venta de material de crossfit, estuvo desde abril de 2022 a octubre de 2023.

    //           `,
    //     },
    //     {
    //       role: 'user',
    //       content: `
    //       ¿Te llamas Jesús?
    //           `,
    //     }
    //   ],
    // )
  }

  handleMessage(prompt: string){
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]

    )

    this.thread.update((prev) => [
      ...prev,
      {
        role: 'user',
        content: prompt
      }
    ])

    console.log(this.thread())
    this.openAiService.checkProsCons(this.thread())
    .subscribe(res => {
      this.isLoading.set(false)
      console.log(res)
      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true,
          text: res.content,
        }
      ] )
      this.thread.update(prev => [
        ...prev,
        {
          role: res.role,
          content: res.content,
        }
      ])
    })
  }

 }
