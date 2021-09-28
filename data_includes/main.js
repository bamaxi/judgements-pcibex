PennController.ResetPrefix(null) // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// Start with welcome screen, then present test trials in a random order,
// and show the final screen after sending the results
Sequence("instructions", "context_practice", randomize("experiment") , "send" , "final" )

Header( /* void */ )
    // This .log command will apply to all trials
    .log( "ID" , GetURLParameter("id") ) // Append the "ID" URL parameter to each result line

// Welcome screen and logging user's ID
newTrial( "instructions" ,
    // We will print all Text elements, horizontally centered
    defaultText.cssContainer({"margin-bottom":"1em", "text-align":"justify", "font-size":"medium"})
        .print()
    ,
    newText("instruction_welcome", "Спасибо за ваш интерес к нашему лингвистическому эксперименту!\
                Участие в нем займёт около 10-15 минут. ПРОЧТИТЕ, ПОЖАЛУЙСТА, ИНСТРУКЦИЮ ЦЕЛИКОМ.")
    ,
    newText("instruction_task", "Вашей задачей будет оценить приемлемость предложений по 5-балльной шкале.\
                Если Вам кажется абсолютно естественным встретить или употребить такое предложение в устной речи,\
                ставьте оценку 5. Если же Вам кажется, что носитель русского языка так никогда бы не сказал,\
                ставьте оценку 1. Промежуточные варианты (предложения, которые кажутся Вам допустимыми,\
                но почему-то не очень хорошими) оценивайте как 4, 3 или 2,\
                в зависимости от степени их приемлемости для вас.")
    ,
    newText("instruction_grammaticality", "Например, предложение \"Вася ест стол сырым\" странное по смыслу,\
                но полностью грамматически верное. С другой стороны, можно понять смысл предложения\
                \"Двор стемнел, и мы зажгли лампу\", но грамматически оно недопустимо.")
    ,
    newText("instruction_intuition", "При оценке ориентируйтесь на собственное чувство русского языка,\
                а не на правила, изучаемые, например, в школе. Наиболее ценной является первичная,\
                интуитивная реакция на предложение.")
    ,
    newText("instruction_scale", "Если кратко, то:<br />\
                “5” - полностью приемлемое для вас предложение<br />\
                “4” - предложение приемлемо, но звучит несколько неуклюже<br />\
                “3” - нечто среднее между оценками “2” и “4”<br />\
                “2” - предложение в принципе приемлемо, но сформулировано плохо, режет ухо<br />\
                “1” - совершенно неприемлемое для вас предложение")
    ,
    newText("instruction_keys", "Оценки следует ставить, <b>нажимая цифры на клавиатуре</b> компьютера.")
    ,
    newText("instruction_context", "Предложения в форме <b>могут</b> быть представлены в контексте (но необязательно).\
                Обратите внимание, оценить нужно только предложение, написанное курсивом,\
                контекст оценивать не нужно.")
    ,
    newText("instruction_info", "Укажите, пожалуйста, некоторую информацию о себе. Она будет использована нами\
                только в обобщённом виде для статистики, и не будет никому передаваться.")
    ,
    newText("instruction_get_name", "Ваше имя, никнейм или инициалы:").center(),
    newTextInput("PersonId")
        .center().print()
    ,
    newText("instruction_get_gender", "Ваш пол:").center(),
    newTextInput("PersonGender")
        .center().print()
    ,
    newText("instruction_get_place", "В каком населенном пункте Вы жили до 13 лет?").center(),
    newTextInput("PersonPlace")
        .center().print()
    ,
    newText("instruction_get_age", "Ваш возраст:").center(),
    newTextInput("PersonAge")
        .center().print()
    ,
    newText("instruction_thanks", "Спасибо, что помогаете нам и науке!")
    ,
    newText("instruction_contact_us", "Если у Вас есть вопросы, напишите нам по почте\
                %%ЧЬЯ-ТО ПОЧТА (oa.bazhukov@gmail.com)%%")
    ,
    newButton("instruction_consent", "Я соглашаюсь участвовать в эксперименте и подтверждаю,<br />\
                    что русский - мой родной язык, и мне 18 или более лет.")
        .cssContainer({"margin-bottom":"3em", "font-size": "large"})
        .center().print()
        .wait(getTextInput("PersonAge").test.text(/^(?:18|19|[2-9][0-9])$/)
              .and(getTextInput("PersonId").test.text(/^(?:\w+|[а-яА-Я]+| )+$/))
              .and(getTextInput("PersonGender").test.text(/^(?:\w+|[а-яА-Я]+| )+$/))
              .and(getTextInput("PersonPlace").test.text(/^(?:\w+|[а-яА-Я]+| )+$/))
        )
    ,
    // newKey(" ").wait()  // Finish trial upon press on spacebar
    newVar("PersonId").global()
        .set(getTextInput("PersonId"))
    ,
    newVar("PersonGender").global()
        .set(getTextInput("PersonGender"))
    ,
    newVar("PersonPlace").global()
        .set(getTextInput("PersonPlace"))
    ,
    newVar("PersonAge").global()
        .set(getTextInput("PersonAge"))
)

newTrial("context_practice" ,
    defaultText.print()
    ,
    // Automatically start and wait for Timer elements when created, and log those events
    defaultTimer.log().start().wait()
    ,
    // newText("context",)
    //     .print("center at 50%", "center at 20%")
    // ,
    newText("test", "Если я придёт вовремя, то меня не будут ругать")
        .italic()
        .print("center at 50%", "center at 50%")
    ,
    
    // newText("q1", "1"),
    // newText("q2", "2"),
    // newText("q3", "3"),
    // newText("q4", "4"),
    // newText("q5", "5"),
    
    // newSelector("score")
    //     .disableClicks()
    //         .add(getText("q1"), getText("q2"),
    //              getText("q3"), getText("q4"),
    //              getText("q5"))
    //         .keys("1", "2", "3", "4", "5")
    //         .wait()
    // tooltip to give instructions
    newTooltip("guide", "Оцените это предложение от 1 до 5, <br />\
                    где 1 - неприемлемое предложение,<br />\
                    а 5 - полностью приемлемое")
        .position("bottom center")  // Display it below the element it attaches to
        .key("", "no click")        // Prevent from closing the tooltip (no key, no click)
        .print(getText("test"))   // Attach to the "target" Text element
    ,
    newScale("score", 5)
        .center()
        .labelsPosition("top")
        .keys()
        .log()
          .print("center at 50%", "center at 80%")
          .wait().test.selected(1)
          .success(getTooltip("guide").text("<p>Верно, это предложение неграмматичное<br />\
                    и должно быть оценено на 1</p>") )
          .failure(getTooltip("guide").text("<p>Нужно нажать '1', потому что<br />\
                    это предложение неграмматично (неверно 'я придЁТ') </p>") )
    ,
    
    // newKey("answerTarget", "FJ")
    //     .wait()                 // Only proceed after a keypress on F or J
    //     .test.pressed("F")      // Set the "guide" Tooltip element's feedback text accordingly
    //     .success( getTooltip("guide").text("<p>Yes, FLOWER <em>is</em> an English word</p>") )
    //     .failure( getTooltip("guide").text("<p>You should press F: FLOWER <em>is</em> an English word</p>") )
    getTooltip("guide")
        .label("Нажмите ПРОБЕЛ, чтобы продолжить")  // Add a label to the bottom-right corner
        .key(" ")                       // Pressing Space will close the tooltip
        .wait()                         // Proceed only when the tooltip is closed
    ,
    getText("test").remove()          // End of trial, remove "target"
)

// Executing experiment from example_list.csv table, where participants are divided into four groups (A - D)
Template( "examples.csv" , 
    row => newTrial( "experiment" ,   
        // Display all Text elements centered on the page, and log their display time code
        // defaultText.center().print("center at 50vw","middle at 50vh").log()
        // ,
        // Automatically start and wait for Timer elements when created, and log those events
        defaultTimer.log().start().wait()
        ,
        newTimer("break", 300)
            .start()
            .wait()
        ,
        newText("context",row.context),
        getText("context").test.text(/^.+$/)
            .success(self.print("center at 50%", "center at 20%"))
        ,
        newText("item",row.item)
            .italic()
              .print("center at 50%", "center at 50%")
        ,
        newScale("score", 5)
            .center()
            .cssContainer({"font-size": "medium"})
            .labelsPosition("top")
            .keys()
            .log()
              .print("center at 50%", "center at 80%")
              .wait()
        // End of trial, move to next one
    )
    // .log("Group"     , row.group)      // Append group (A vs B) to each result line
    // .log("Condition" , row.condition)  // Append condition (tr. v op. v fi.) to each result line
    // .log("Expected"  , row.expected )  // Append expectped (f vs j) to each result line
    // .log("PrimeType", row.primetype )  // Append prime type (rel. vs unr.) to each result line
    // .log("context", row.context)       // log context also
    // .log("target", row.target)         // log target as well
    .log("group", row.group)
    .log("pair_id", row.pair_id)
    .log("item_id", row.item_id)
    .log("context_id", row.context_id)
    .log("type",row.type)
    // socio data should potentially be carried to "instruction" or "final" log,
    //  so it isn't over multiplied
    .log("PersonId", getVar("PersonId"))
    .log("PersonGender", getVar("PersonGender"))
    .log("PersonPlace", getVar("PersonPlace"))
    .log("PersonAge", getVar("PersonAge"))
)

// Send the results
SendResults("send")

// A simple final screen
newTrial ( "final" ,
    newText("Эксперимент закончен. Спасибо Вам за участие!")
        .print()
    ,
    newText("Вы можете закрыть страницу.")
        .print()
    ,
    newText("Если у Вас есть вопросы, напишите нам по почте %%ЧЬЯ-ТО ПОЧТА (oa.bazhukov@gmail.com)%%")
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
)