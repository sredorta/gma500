import {sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
      query(':enter, :leave', [style({ position: 'fixed', width:'100%' })], {optional:true}),
      query(':enter', 
            [
                style({ transform: 'translateX(100%)', opacity:0 }),
                animate('0.5s ease-in-out', style({transform: 'translateX(0%)',opacity:1}))
            ],
            {optional:true}
            ),
      query(':leave', 
            [
                style({ transform: 'translateX(0%)', opacity:0.5 }),
                animate('0.3s ease-in-out', style({transform: 'translateX(-100%)',opacity:0}))
            ],
            {optional:true}
            ),
      ])
  ]);