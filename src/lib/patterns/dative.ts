import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "dativ",
  slug: "dative",
  title: "Dem Dativ",
  shortdesc: "When something is _kinda_ affected by a verb",
  icon: faHandHoldingHeart,
  explanation: md`
The dative noun case is used when referring to the _indirect object_ of a sentence. What's an indirect object? 
Something that is affected by a verb, but is not the direct object. Like the recipient of a gift:

<TextHighlighter parts="actor, indirectobject, directobject">
[The boy] gives [the squirrel] [the almond].
</TextHighlighter>

In English, we know whether an object is direct or indirect by the order of the words. "the boy gives the almond 
the squirrel" would have a totally different meaning! In German, the word order is much more flexible, because
you can tell the indirect object from the use of the dative case instead. These two sentences have the same meaning:

<TextHighlighter parts="actor, indirectobject, directobject">
[Der Junge] gibt [dem Eichhörnchen] [die Mandel].
</TextHighlighter>

<TextHighlighter parts="actor, directobject, indirectobject">
[Der Junge] gibt [die Mandel] [dem Eichhörnchen].
</TextHighlighter>

When referring to the indirect object, masculine and neuter nouns use the dative case _dem_. This word _dem_ is 
unique to the dative case, so it's great for quickly interpreting a sentence. Meanwhile, feminine nouns change 
from the nominative _die_ to dative _der_.

<LTable>
_ / Masculine / Feminine / Neuter / Plural
Nominative / der / die / das / die
Dative / **dem** / **der** / **dem** / **den**
</LTable>

The plural also has the quirk that it adds an **-n** to the end of the noun, if it doesn't already have one.

<DialogueExample>
squirrel:
Lasst uns mehr Mandeln unter **den** Bäume**n** suchen.
Let us seek more almonds among the trees.
</DialogueExample>

<Tip title="Der Frau">
Be careful not to confuse the feminine dative _der_ with the masculine nominative _der_, or the plural dative _den_ with 
the masculine accusative _den_. While spelled the same, they are effectively different words.<br><br> If you know the 
gender/plurality of the noun you can reliably distinguish them; otherwise, you'll have to rely on contextual clues to 
the dativeness, e.g. the use of an intransitive verb like _helfen_.
</Tip>
  `,
  story: [
    // LEVEL 1
    {
      from: "lukas",
      message: "Der Junge gibt dem Eichhörnchen eine Mandel.",
      translation: "The boy gives the squirrel an almond."
    },
    {
      question: `Lukas is referring to "dem Eichhörnchen"...`,
      choices: [
        { text: "directly" },
        { text: "indirectly", correct: true }
      ]
    },
    {
      from: "squirrel",
      message: "Das Eichhörnchen dankt dem Jungen für sein Angebot.",
      translation: "The squirrel thanks the boy for his offering."
    },
    {
      from: "anna",
      message: "Willst du der Schwester auch eine Mandel geben?",
      translation: "Will you give the sister an almond too?"
    },
    {
      from: "lukas",
      message: "Vorsicht, er ist ziemlich besitzergreifend bei den Mandeln.",
      translation: "Careful, he's pretty possessive with the almonds."
    },
    {
      from: "squirrel",
      message: "Das Eichhörnchen wird einem Menschen helfen, dieses eine Mal.",
      translation: "The squirrel will help a human, this once."
    }
  ],
  exercises: [
    {
      from: "squirrel",
      message: "Ich habe gelernt, dass Menschen [einem] kleinen Tier oft Futter geben.",
      translation: "I learned that humans will often give food to [a] small animal.",
      hint: "[neuter]",
      explanation: `We can know this is dative case from the use of the verb _geben_, which takes a direct object (die Futter) and gives it to the indirect object (das Tier). For a neuter noun in the dative case, we translate "a" as "einem".`
    },
    {
      from: "lukas",
      message: "Ja, Menschen helfen gerne [niedlichen Tieren].",
      translation: "Yes, humans like to help [cute animals].",
      hint: "[niedliche Tiere]",
      explanation: `_helfen_ is what's called an intransitive verb, one that doesn't take a direct object. Whoever is being helped is always the indirect object, taking the dative case. Dative plurals gain the -n suffix, so _niedliche Tiere_ becomes _niedlichen Tieren_.`
    },
    {
      from: "fox",
      message: "Die Verbindung zu [dem] Server ist hergestellt.",
      translation: "The connection to [the] server is established.",
      hint: "[masculine]",
      explanation: "What's being established? The connection, making it the direct object of the sentence. That means the server is the indirect object, and gets the dative case. The dative form of _the_ for a masculine noun is _dem_."
    }
  ]
})

  // LEVEL 2
  // {
  //   lines: [
  //     {
  //       from: "fox",
  //       message: "Gehen wir zu [der] Konferenz?",
  //       translation: "Are we going to [the] conference?",
  //       hint: "[feminine]",
  //     },
  //     {
  //       from: "lindenbaum",
  //       message: "Die mit [den] nervigen alten Männern?",
  //       translation: "The one with [the] annoying old men?"
  //     },
  //     {
  //       from: "lindenbaum",
  //       message: "Sie interessieren sich nur für [die] Anzahl ihrer Zitate.",
  //       translation: "They're only interested in their citation counts."
  //     },
  //     {
  //       from: "lindenbaum",
  //       message: "Was wir mit [der] Gravitationsanomalie machen, könnte viel wichtiger sein.",
  //       translation: "What we're doing with [the] gravitational anomaly could be way more important.",
  //       hint: "[feminine]"
  //     },
  //     {
  //       from: "fox",
  //       message: "Oh! Kann ich dann [die] Projektoren hacken und sie rickrollen?",
  //       translation: "Oh! Then can I hack [the] projectors and rickroll them?"
  //     },
  //     {
  //       from: "lindenbaum",
  //       message: "Mit [der] Quantenkryptoanalyse? Sie wollen es für _Rickrolling_ verwenden?",
  //       translation: "With [the] quantum cryptanalysis? You want to use it for _rickrolling_?",
  //       hint: "[feminine]"
  //     },
  //     {
  //       from: "fox",
  //       message: "Bitteeee?",
  //       translation: "Pleaseeee?"
  //     },
  //     {
  //       from: "lindenbaum",
  //       message: "Natürlich, warum nicht. Ich denke, [das ist] eine gute Übung.",
  //       translation: "Sure, why not. I guess [it is] good practice."
  //     }
  //   ]
  // },

    // // LEVEL 1
    // {
    //   lines: [
    //     {
    //       from: "anna",
    //       message: "Du hast niemandem von [dem] außerirdischen Eichhörnchen erzählt?",
    //       translation: "You haven't told anyone about [the] alien squirrel?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Ehrlich gesagt, weiß ich nicht, wie die Welt darauf reagieren würde.",
    //       translation: "Honestly, I don't know how the world would react."
    //     },
    //     {
    //       from: "lukas",
    //       message: "Und Töski ist hier [im] Urlaub. Er braucht die Politik nicht.",
    //       translation: "And Töski is here [on] vacation. He doesn't need the politics.",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "anna",
    //       message: "Nicht nur, weil er wirklich süß und flauschig ist?",
    //       translation: "It's not just because he's really cute and fluffy?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Okay, das könnte ein Faktor sein.",
    //       translation: "Okay, that might be a factor."
    //     },
    //   ]
    // }
