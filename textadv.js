var npc='default';
var stage=0;
var flags={
    dragon: 0,
    sword: 0,
    shield: 0,
    merch: 0,
}
var path={};
//fetch will use a GET method to make a request to 
//random-data-api.com and use their random user data 
//api to make up a fake user
fetch('https://random-data-api.com/api/v2/users')
    //read data from respnse stream
    .then(response => response.json())
    .then(response => {
        npc=response.first_name;
        console.log(response);

        //this object contains all of the prompts and branches
        //of the story.  
        path={
            text: 'You have been traveling for some time now, on your way to the villiage that last quest giver indicated.  Furthur down the road you see a person walking towards you.',
            stageOne: [
                {   //you chose to say hi
                    text: 'You say hello. They respond, \"Hey! How are you my name is '+npc+'.\"',
                    stageTwo: [
                        {
                            //you ask about the village.
                            text: 'they tell you about the dragon',
                            stageThree: [
                                {
                                    //say bye
                                    text: "You say bye."
                                },
                                {
                                    //You ask where they are going
                                    text: 'They tell you that they are a merchant and that they have wares, if you have coin. I have swords and shields for sale.',
                                    stageFour: [
                                        {
                                            //Buy Sword
                                            text: 'You buy a Sword.',
                                            stageFive: [
                                                {
                                                    //Buy Shield
                                                    text: 'You buy a Shield'
                                                },
                                                {
                                                    //Say bye confident
                                                    text: 'You say goodbye confidently'
                                                }
                
                                            ]
                                        },
                                        {
                                            //Buy Shield
                                            text: 'You buy a Shield.',
                                            stageFive: [
                                                {
                                                    //Buy Sword
                                                    text: 'You buy a Sword'
                                                },
                                                {
                                                    //Say bye confident
                                                    text: 'You say goodbye confidently'
                                                }
                
                                            ]
                                        },
                                        {
                                            //Buy nothing
                                            text: "You don't purchase anything and continue on to the villiage. "
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            //You ask where they are going
                            text: 'They tell you that they are a merchant and that they have wares, if you have coin. I have swords and shields for sale.',
                            stageThree: [
                                {
                                    //Buy Sword
                                    text: 'You buy a Sword.',
                                    stageFour: [
                                        {
                                            //Buy Shield
                                            text: 'You buy a Shield'
                                        },
                                        {
                                            //Say bye confident
                                            text: 'You say goodbye confidently'
                                        }

                                    ]
                                },
                                {
                                    //Buy Shield
                                    text: 'You buy a Shield.',
                                    stageFour: [
                                        {
                                            //Buy Sword
                                            text: 'You buy a Sword'
                                        },
                                        {
                                            //Say bye confident
                                            text: 'You say goodbye confidently'
                                        }

                                    ]
                                },
                                {
                                    //Buy nothing
                                    text: "You don't purchase anything and continue on to the villiage. "
                                }
                            ]
                        },
                        {
                            text: "You say bye."
                        }
                    ]
                },
                {
                    //you chose to ignore the person
                    text: "You choose to ignore the person."
                }
            ]
        };
        document.querySelector('#text').textContent=path.text;
        stage++;
     })
    .catch(error => console.error(error));


//wait for the page to load and fetch the api data.  
//The only data stored is the first_name.
//More, like gender and occupation, 
//can be accessed for future versions of the game.
document.addEventListener('DOMContentLoaded',function(){
    
    var button= document.querySelector('#input-button');
    var hintButton= document.querySelector('#hint-button');
    var input= document.querySelector('#text-input');
    var hint="";

    //when the player clicks [hint], 
    //potential input options will appear.
    //in the 'hint' div.
    hintButton.addEventListener('click', function(){
        if(stage==1)
        {
            hint="*You can type: [Say hi.] or [Ignore.]*";
        }
        if(stage==2)
        {
            hint="*You can type: [Ask about village.] or [Ask about them.] or [Say bye.]";
        }
        if(stage==3)
        {
            hint="*You can type: [Ask about village.] or [Ask about them.] or [Say bye.]";
        }
        if(stage==4)
        {
            hint="*You can type: [Say bye.] or [Buy sword.] or [Buy shield.] or [Buy nothing.] ";
        }
        if(stage==5)
        {
            hint="*You can type: [Say bye.] or [Buy sword.] or [Buy shield.] or [Buy nothing.] ";
        }
        if(stage==10)
        {
            hint="*You have reached the end. Please reload the page.* ";
        }
        document.querySelector('#hint').textContent= hint;
    });

    //when the player clicks [ENTER], compare to various 
    //prompts and output to the 'text' div the appropriate response.
    //Also depending on the path the player takes, various flags
    //will be set to 1.
    button.addEventListener('click', function(){
        console.log(flags);
        //STAGE 1
        if(input.value=='Say hi.' && stage==1){
            document.querySelector('#text').textContent= path.stageOne[0].text;
            stage++;
        }
        if(input.value=='Ignore.' && stage==1){
            document.querySelector('#text').textContent= path.stageOne[1].text;
            stage=10;
        }

        //STAGE 2
        if(input.value=='Ask about village.' && stage==2){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].text;
            flags.dragon=1;
        }
        if(input.value=='Ask about them.' && stage==2){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].text;
            flags.merch=1;
            stage++;
        }
        if(input.value=='Say bye.' && stage==2){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[2].text;
            stage=10;
        }

        //STAGE 3
        if(input.value=='Ask about village.' && stage==3){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].text;
            flags.dragon=1;
        }
        //1
        if(input.value=='Say bye.' && stage==3){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[0].text;
            stage=10;
        }
        if(input.value=='Ask about them.' && stage==3){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].text;
            flags.merch=1;
        }
        //2
        if(input.value=='Buy sword.' && stage==3&&flags.merch==1){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[0].text;
            flags.sword=1;
        }
        if(input.value=='Buy shield.' && stage==3&&flags.merch==1){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[1].text;
            flags.shield=1;
        }
        if(input.value=='Buy nothing.' && stage==3&&flags.merch==1){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[2].text;
            stage=10;
        }

        //STAGE 4
        if(input.value=='Ask about village.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].text;
            flags.dragon=1;
        }
        //1
        if(input.value=='Buy sword.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[0].text;
            flags.sword=1;
        }
        if(input.value=='Buy shield.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[1].text;
            flags.shield=1;
        }
        if(input.value=='Buy nothing.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[2].text;
            stage=10;
        }

        //2
        if(input.value=='Buy shield.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[0].stageFour[0].text;
            flags.shield=1;
        }
        if(input.value=='Say bye.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[0].stageFour[1].text;
            stage=10;
        }

        //3
        if(input.value=='Buy sword.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[1].stageFour[0].text;
            flags.sword=1;
        }
        if(input.value=='Say bye.' && stage==4){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[1].stageThree[1].stageFour[1].text;
            stage=10;
        }

        //STAGE 5
        //1
        if(input.value=='Buy sword.' && stage==5){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[0].stageFive[0].text;
            flags.sword=1;
        }
        if(input.value=='Say bye.' && stage==5){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[0].stageFive[1].text;
            stage=10;
        }

        //2
        if(input.value=='Buy Shield.' && stage==5){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[1].stageFive[0].text;
            flags.shield=1;
        }
        if(input.value=='Say bye.' && stage==5){
            document.querySelector('#text').textContent= path.stageOne[0].stageTwo[0].stageThree[1].stageFour[1].stageFive[1].text;
            stage=10;
        }

        //Once the player has gone through all of the stages. This will
        //check the various flags and provide the appropriate ending and append
        //the text to the last message.
        if(stage==10){
            console.log(flags);
            if(flags.dragon==0&&flags.sword==0&&flags.shield==0)
            {
                document.querySelector('#text').textContent+="You arrive at the villiage.  A dragon comes out of nowhere and breathes fire on you. THE END.";
            }
            if(flags.dragon==1&&flags.sword==0&&flags.shield==0)
            {
                document.querySelector('#text').textContent+="You approach the dragon and suddenly realize you are not prepared for battle.  The dragon laughs and breaths fire on you. THE END.";
            }
            if(flags.dragon==1&&flags.sword==1&&flags.shield==0)
            {
                document.querySelector('#text').textContent+="You aproach the dragon confidently and slay it with your sword as you dodged it's attack.  You find your quest Item and have dragon scales.";
            }
            if(flags.dragon==1&&flags.sword==0&&flags.shield==1)
            {
                document.querySelector('#text').textContent+="You aproach the dragon confidently and are able to dodge and block it's attacks as you find your quest item and escape.";
            }
            if(flags.dragon==1&&flags.sword==1&&flags.shield==1)
            {
                document.querySelector('#text').textContent+="You aproach the dragon confidently but realize that you are over encumbered as the dragon swoops down and breathes it's fire on you. THE END.";
            }
            if(flags.dragon==0&&flags.sword==1&&flags.shield==1)
            {
                document.querySelector('#text').textContent+="You arrive at the village and are caught offgaurd by a dragon attaack.  You try to dodge but realize that you are over encumbered as the dragon swoops down and breathes it's fire on you. THE END.";
            }
            if(flags.dragon==0&&flags.sword==0&&flags.shield==1)
            {
                document.querySelector('#text').textContent+="You arrive at the villiage and are attacked by a dragon.  Luckily you were able to block it's attack with your shield and escape with your life.  But you failed your quest.";
            }
            if(flags.dragon==0&&flags.sword==1&&flags.shield==0)
            {
                document.querySelector('#text').textContent+="You arrive at the villiage and are attacked by a dragon.  you are able to cut it's heart and save the village, but it also lands a fatal blow with it's tail. THE END.";
            }
        }
    })  
});