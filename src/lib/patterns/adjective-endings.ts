import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "adjective-endings",
  slug: "adjective-endings",
  title: "Grüner Tee",
  shortdesc: "Adjective endings for nouns without articles",
  icon: faExclamation,
  explanation: md`
Consider the difference between these two phrases:

<DialogueExample>
lukas:
  Das Eichhörnchen und der starke Kaffee vertragen sich nicht.
  The squirrel and the strong coffee don't mix.
</DialogueExample>

<DialogueExample>
lukas:
  Eichhörnchen und starke**r** Kaffee vertragen sich nicht.
  Squirrels and strong coffee don't mix.
</DialogueExample>

Notice how an **r** gets added to the adjective in the second example? Because there is no _der_, the adjective _starke_ becomes _starker_ to indicate the gender of the masculine noun _Kaffee_.

The general pattern is: when there is no _der-_ or _ein-_ type word preceding a noun, it is instead the adjective that indicates gender and case.

<LTable>
_ / Masculine / Feminine / Neuter / Plural
Nominative / weich**er** Flaum / ewig**e** Liebe / geheim**es** Wissen / süß**e** Freunde
Accusative / weich**en** Flaum / ewig**e** Liebe / geheim**es** Wissen / süß**e** Freunde
Dative / weich**em** Flaum / ewig**er** Liebe / geheim**em** Wissen / süß**en** Freunden
Genitive / weich**en** Flaumes / ewig**er** Liebe / geheim**en** Wissens / süß**er** Freunde
</LTable>

In the example with the article you can also notice that it's _der starke Kaffee_, where the adjective _stark_ has an **e** added to it.

Even though it's the article's job to indicate the gender and case, the adjective still changes, it is different for _der-_ and _ein-_ words:

<LTable>
der- words / Masculine / Feminine / Neuter / Plural
Nominative / **der** weich**e** Flaum / **die** ewig**e** Liebe / **das** geheim**e** Wissen / **die** süß**en** Freunde
Accusative / **den** weich**en** Flaum / **die** ewig**e** Liebe / **das** geheim**e** Wissen / **die** süß**en** Freunde
Dative / **dem** weich**en** Flaum / **der** ewig**en** Liebe / **dem** geheim**en** Wissen / **den** süß**en** Freunden
Genitive / **des** weich**en** Flaumes / **der** ewig**en** Liebe / **des** geheimen Wissens / **der** süß**en** Freunde
</LTable>

<LTable>
ein- words / Masculine / Feminine / Neuter / Plural
Nominative / **ein** weich**er** Flaum / **eine** ewig**e** Liebe / **ein** geheim**es** Wissen / **meine** süß**en** Freunde
Accusative / **einen** weich**en** Flaum / **eine** ewig**e** Liebe / **ein** geheim**es** Wissen / **meine** süß**en** Freunde
Dative / **einem** weich**en** Flaum / **einer** ewig**en** Liebe / **einem** geheim**en** Wissen / **meinen** süß**en** Freunden
Genitive / **eines** weich**en** Flaumes / **einer** ewig**en** Liebe / **eines** geheim**en** Wissens / **meiner** süß**en** Freunde
</LTable>
`
  ,
  story: [
    {
      from: "squirrel",
      message: "Was trinkst du da?",
      translation: "What are you drinking?"
    },
    {
      from: "lukas",
      message: "Grüner Tee! Das ist gesund für den Menschen.",
      translation: "Green tea! It's healthy for humans."
    },
    {
      question: "Why does Lukas say 'grüner' instead of 'grüne'?",
      choices: [
        { text: "Since there's no article, the adjective indicates the gender of _der Tee_", correct: true },
        { text: "The phrase is in the dative case, which adds an -r" },
        { text: "He's secretly a pirate" }
      ]
    },
    {
      from: "squirrel",
      message: "Und was trinkt Anna?",
      translation: "And what is Anna drinking?"
    },
    {
      from: "anna",
      message: "Das ist starker Kaffee. Ich habe nicht viel Schlaf bekommen.",
      translation: "That is strong coffee. I didn't get much sleep."
    },
    {
      question: "What kind of coffee does Anna say she is drinking?",
      choices: [
        { text: "Strong coffee", correct: true },
        { text: "Stronger coffee" },
      ]
    }
  ],
  exercises: [
    {
      from: "mirror",
      message: "Ihr seid ein [schlauer] Fuchs.",
      translation: "You are a [clever] fox.",
      hint: "[schlau]"
    },
    {
      from: "lindenbaum",
      message: "Dies sind die Studien des [nervigen] Professors",
      translation: "Those are the studies of the [annoying] professor.",
      hint: "[nervig]"
    },
    {
      from: "squirrel",
      message: "[Komische] Menschen...",
      translation: "[Weird] humans...",
      hint: "[komisch]"
    },
    {
      from: "fox",
      message: "Die [schnelle] Analyse ergibt: Es handelt sich um eine Kugel.",
      translation: "The [quick] analysis shows: It is an orb.",
      hint: "[schnell]"
    },
    {
      from: "squirrel",
      message: "Ich verlange noch mehr [sanfte] Zärtlichkeiten!",
      translation: "I ask for more [gentle] caresses!",
      hint: "[sanft]"
    },
  ]
})