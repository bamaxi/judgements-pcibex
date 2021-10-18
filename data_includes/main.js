PennController.ResetPrefix(null) // Shorten command names (keep this line here))


// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment


Sequence("instructions", "context_practice", randomizeNoMoreThan(
                anyOf("test", "fillers"),
                2
            ),
        "send", "final"
)

Header( /* void */ )
    // This .log command will apply to all trials
    .log( "ID" , GetURLParameter("id") ) // Append the "ID" URL parameter to each result line

// Welcome screen and logging user's ID
newTrial( "instructions" ,
    // We will print all Text elements, horizontally centered
    defaultText.cssContainer({"margin-bottom":"1em", "text-align":"justify", "font-size":"medium"})
        .print()
    ,
    newText("instruction-welcome", "Спасибо за Ваш интерес к нашему лингвистическому эксперименту!\
                Участие в нем займёт около 10-15 минут. ПРОЧТИТЕ, ПОЖАЛУЙСТА, ИНСТРУКЦИЮ ЦЕЛИКОМ.")
    ,
    newText("instruction-task", "Вашей задачей будет оценить приемлемость предложений по 5-балльной шкале.\
                Если Вам кажется абсолютно естественным услышать/увидеть  или употребить такое предложение,\
                ставьте оценку 5. Если же Вам кажется, что носитель русского языка так никогда бы  не сказал/не написал,\
                ставьте оценку 1. Промежуточные варианты (предложения, которые кажутся Вам допустимыми,\
                но почему-то не очень хорошими) оценивайте как 4, 3 или 2,\
                в зависимости от степени их приемлемости для вас.")
    ,
    newText("instruction-intuition", "При оценке ориентируйтесь на собственную интуицию носителя русского языка.\
                Постарайтесь давать оценку быстро, опираясь на свои первые ощущения.")
    ,
    newText("instruction-scale", "Если кратко, то:<br />\
                “5” - полностью приемлемое для вас предложение<br />\
                “4” - предложение приемлемо, но звучит несколько неуклюже<br />\
                “3” - нечто среднее между оценками “2” и “4”<br />\
                “2” - предложение в принципе приемлемо, но сформулировано плохо, режет ухо<br />\
                “1” - совершенно неприемлемое для вас предложение")
    ,
    newText("instruction-keys", "Оценки следует ставить, <b>нажимая цифры на клавиатуре</b> компьютера.")
    ,
    newText("instruction-context", "Предложения в форме <b>могут</b> быть представлены в контексте (но необязательно).\
                Обратите внимание, оценить нужно только предложение, написанное <b>жирным шрифтом</b>,\
                контекст оценивать не нужно.")
    ,
    newText("instruction-info", "Укажите, пожалуйста, некоторую информацию о себе. Она будет использована нами\
                только в обобщённом виде для статистики, и не будет никому передаваться.")
    ,
    newText("instruction-get-name", "Ваше имя, никнейм или инициалы:"
                + " <sup id=\"star\">*</sup>").center(),
    newTextInput("PersonId")
        .center().print()
    ,
    newText("instruction-get-gender", "Ваш пол:"
                + " <sup id=\"star\">*</sup>").center(),
    newTextInput("PersonGender")
        .center().print()
    ,
    newText("instruction-get-place", "В каком населенном пункте (в каких пунктах) Вы жили до 13 лет?"
                + " <sup id=\"star\">*</sup>").center(),
    newTextInput("PersonPlace")
        .center().print()
    ,
    newText("instruction-get-age", "Ваш возраст:"
                + " <sup id=\"star\">*</sup>").center(),
    newTextInput("PersonAge")
        .center().print()
    ,
    newText("instruction-get-other-languages", "Русский язык является вашим единственным родным языком?" 
                + " <sup id=\"star\">*</sup>").center(),
    newScale("PersonRussianOnly", "да", "нет")
        .labelsPosition("top")
        .center().print()
    ,
    newText("instruction-get-other-languages=", "Укажите эти другие языки при желании:").center(),
    newTextInput("PersonOtherLanguages")
        .center().print()
    ,
    // newTextInput("PersonOtherLanguages").center(),
    // getScale("PersonRussianOnly").test.selected("да")
    //     .success(newText("instruction-optional-get-languages",
    //                 "при желании, укажите эти языки").center())
    // ,
    // getScale("PersonRussianOnly").test.selected("да")
    //     .success(getTextInput("PersonOtherLanguages"))
    // , 
    newTextInput("instruction-button-form-correctness", "Если кнопка ниже не срабатывает, проверьте,\
                пожалуйста, корректность введённых выше данных.")
    ,
    newText("instruction-thanks", "Спасибо, что помогаете нам и науке!")
    ,
    newText("instruction-contact-us", 'Если у Вас есть вопросы, напишите нам по почте\
                <a href="mailto:oa.bazhukov+judg@gmail.com?subject=Вопрос об исследовании">\
                oa.bazhukov+judg@gmail.com</a>')
    ,
    newText("instruction-button-form-correctness", "Если кнопка ниже не срабатывает, проверьте,\
                пожалуйста, корректность введённых выше данных.")
    ,
    newButton("instruction-consent", "Я соглашаюсь участвовать в эксперименте и подтверждаю,<br />\
                    что русский - мой родной язык, и мне 18 или более лет.")
        .cssContainer({"margin-bottom":"3em", "font-size": "large"})
        .center().print()
        .wait(getTextInput("PersonAge").test.text(/^(?:18|19|[2-9][0-9])$/)
              .and(getTextInput("PersonId").test.text(/^(?:\w+|[а-яА-Я]+| )+$/))
              .and(getTextInput("PersonGender").test.text(/^(?:\w+|[а-яА-Я]+| )+$/))
              .and(getTextInput("PersonPlace").test.text(/^(?:\w+(?:-|,)?|[а-яА-Я]+(?:-|,)?| )+$/))
              .and(getScale("PersonRussianOnly").test.selected())
              .and(getTextInput("PersonOtherLanguages").testNot.text(/^.+$/)
                    .or(getTextInput("PersonOtherLanguages").test.text(/^(?:\w+(?:-|,)?|[а-яА-Я]+(?:-|,)?| )+$/))
              )
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
    ,
    newVar("PersonRussianOnly").global()
        .set(getScale("PersonRussianOnly"))
    ,
    newVar("PersonOtherLanguages").global()
        .set(getTextInput("PersonOtherLanguages"))
)
    .log("PersonId", getVar("PersonId"))
    .log("PersonGender", getVar("PersonGender"))
    .log("PersonPlace", getVar("PersonPlace"))
    .log("PersonAge", getVar("PersonAge"))
    .log("PersonRussianOnly", getVar("PersonRussianOnly"))
    .log("PersonOtherLanguages", getVar("PersonOtherLanguages"))

newTrial("context_practice" ,
    defaultText.print()
    ,
    // Automatically start and wait for Timer elements when created, and log those events
    defaultTimer.log().start().wait()
    ,

    newText("test", "Если я придёт вовремя, то меня не будут ругать")
        .bold()
        .print("center at 50%", "center at 30%")
    ,

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
    
    // getTooltip("guide")
    //     .label("Нажмите ПРОБЕЛ, чтобы продолжить")  // Add a label to the bottom-right corner
    //     .key(" ")                       // Pressing Space will close the tooltip
    //     .wait()                         // Proceed only when the tooltip is closed
    // ,
    
    newButton("continue", "Продолжить")
        .cssContainer({"transform": "scale(1.8)"})
        .center().print("center at 50%", "center at 92%")
        .wait()
    ,
    getText("test").remove()          // End of trial, remove "target"
)


Template(
    GetTable("examples.csv")
        .filter( "type" , /lbe/ )
    ,
    row => newTrial( "test" ,
        defaultTimer.log().start().wait()
        ,
        newTimer("break", 300)
            .start()
            .wait()
        ,
        // newText("context",row.context),
        // getText("context").test.text(/^.+$/)
        //     .success(self.print("center at 50%", "center at 20%"))
        // ,
        // newText("item",row.item)
        //     .italic()
        //       .print("center at 50%", "center at 50%")
        // ,
        newText("context",row.context),
        newText("context-item", row.context + "<br />" + "<b>" + row.item + "</b>"),
        newText("item", row.item).bold(),
        getText("context").test.text(/^.+$/)
            .success(
                getText("context-item")
                    // .cssContainer({"align-items": "center"})
                    .print("center at 50%", "center at 30%")
            )
            .failure(
                getText("item")
                    .print("center at 50%", "center at 40%")
            )
        ,
        newVar("RT").global().set( v=>Date.now() )
        ,
        newScale("score", 5)
            .center()
            .cssContainer({"font-size": "medium"})
            .labelsPosition("top")
            .keys()
            .log()
              .print("center at 50%", "center at 80%")
              .wait()
        ,
        getVar("RT").set( v=>Date.now()-v )
    )
    .log("group", row.group)
    .log("pair_id", row.pair_id)
    .log("item_id", row.item_id)
    .log("context_id", row.context_id)
    .log("type",row.type)
    .log("RT", getVar("RT"))
);


Template(
    GetTable("examples.csv")
        .filter( "type" , /(?:m|p)q/ ) 
    ,
    row => newTrial( "fillers" ,
        defaultTimer.log().start().wait()
        ,
        newTimer("break", 300)
            .start()
            .wait()
        ,
        newText("context",row.context),
        newText("context-item", row.context + "<br />" + "<b>" + row.item + "</b>"),
        newText("item", row.item).bold(),
        getText("context").test.text(/^.+$/)
            .success(
                getText("context-item")
                    // .cssContainer({"align-items": "center"})
                    .print("center at 50%", "center at 30%")
            )
            .failure(
                getText("item")
                    .print("center at 50%", "center at 40%")
            )
        ,
        newVar("RT").global().set( v=>Date.now() )
        ,
        newScale("score", 5)
            .center()
            .cssContainer({"font-size": "medium"})
            .labelsPosition("top")
            .keys()
            .log()
              .print("center at 50%", "center at 80%")
              .wait()
        ,
        getVar("RT").set( v=>Date.now()-v )
    )
    .log("group", row.group)
    .log("pair_id", row.pair_id)
    .log("item_id", row.item_id)
    .log("context_id", row.context_id)
    .log("type",row.type)
    .log("RT", getVar("RT"))
);


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
    newText('Если у Вас есть вопросы, напишите нам по почте\
                <a href="mailto:oa.bazhukov+judg@gmail.com?subject=Вопрос об исследовании">\
                oa.bazhukov+judg@gmail.com</a>')
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
)