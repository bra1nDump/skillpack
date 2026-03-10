# Human Steering History

Raw planning notes from the user, preserved as stated. Minimal context labels are added only so the sequence remains understandable.

## Initial project brief

```
lets checkout bra1ndump project into projects

and lets write 

------
Skill directory

Okay, so here's the gist of the product idea. There's a bunch of skills that are available to coding agents, to cloud code, cursor, codecs, and others. And these skills are kind of like recently been becoming a boom in the industry. And there's a bunch of them, and mostly people publish them on GitHub. And there's a couple of skill registries. There's one by Vercel. They have a really nice CLI package name called Skills. So they're really, I want to say they're probably the leaders right now with the skill collection. There's also like the plugin directory that's official in Cloud Code. And like CoWork, I think, also have their own skill directory on desktop. And yeah, and then there's a couple of other skill websites that like kind of gather, like that have a registry of all the skills. So here's a pitch. The pitch is we create, we want to create our own marketplace slash directory of skills. And what we want it to be is we want it to be opinionated. And we also want it to be like highly, like we only want the top useful skills there essentially. We don't want any noise skills. Like we don't want just the number go up game of like 400,000 skills. Like that's ridiculous. Nobody will ever look through that. And in order to actually get the skill, we will create the skill to find the skill that you need for, or like the skill, like the skills for your projects that actually apply. And yeah, so the actual deliverables that I want you to build, I want you to build a web app. There's going to be a server. It's going to be a mono repo. There's going to be a web app which will essentially just serve the skills, like serve the front end of this thing. And I guess there's going to be a server. Honestly, I'm even thinking maybe we don't even need the server. Maybe we just have like a static website that jus and the main idea of this is like we'll have again we'll have it will be opinionated it will have a like it will have a small collection of these skills it will have only high quality skills and it will be comparing like it will be evaluating these skills against each other and the way it will actually be evaluating these skills is like based on a couple of metrics like whether this is an official provider like if the skill is for google google is going to have like a huge bump on like how good this skill is considered to be uh then it will be like how often is this skill mentioned on twitter we can actually inline the tweets um using like the twitter api whatever the fuck to show them like even maybe appearing like real time feed but that's probably an overkill we just no we just create a report yes we will run an agent that will essentially create a report for a given popular skill and it will look at like the trajectory like is there a strong and then we'll also keep track of the contender skills and also at the like trajectory of the skill like is the skill picking up is it hot or is it just kind of like old school like as an old news uh like it used to be popular but now it's kind of old news and there's better options available and it will also have like a really simple comparison between like how do i pick between these two so kind of like a table comparison that people usually generate for these and the front end should be like pretty simple let's actually look for the meta right now on twitter like what are people using for documentation websites because we don't want a complicated website we'll just be probably pretty simple documentation website we might have some like nice visuals maybe some collapsing stuff so maybe some interactivity is still desirable um and also one key thing we want to show is how the skills actually compare against each other so we can actually have people test a couple of the skills and we can actually people have already been testing these skills so all we really need to do is we probably need to find videos on youtube find tweets and just inline these into the skill itself and all this work will be essentially done by a background agent that will be continually spinning on the server and just checking for these skills like for the updates and i think that agent will basically simply be committing to github and that will be picked up bum by our front end and yeah honestly i think we can just start with a simple static website it doesn't need to be live uh like github will be the driver here and um we i think we can make this repository and agent open source and the agent like you can create an issue in the repository like if you want to report some issue you can just like like issue with the dots or if you want to vote on something you can just create an issue on github i think right like that doesn't sound too crazy oh and then one other key important thing we actually will test how well these skills are working in like more or less like a real scenario so we will have like we'll set up some fake like i don't know if it requires like us to test notion or linear we can produce like we can basically benchmark these skills it's kind of like similar to how the like different models are coding a watch face kind of challenge where they just continuously rerun it so it will be something similar to that where we like run the skill like using like we actually spawn a child agent to run the skill with some fake setup account that we have set up for this particular purpose also probably with another agent and um with basically we'll just have like a fake we'll just have fake data but there will be kind of like believable data to the real use case like things like i guess things related to money like there's probably a bunch of skills that will be extremely hard to evaluate like for example some uh like i don't know development like development flow like development paradigms or like harness engineering things where we would essentially have to run an agent for a really long time and like to get a result but i actually think we can even test that like because the skill should be yeah i actually think we can just yeah the whole point will be to provide you some interactive thing that that skill produced or just like some artifact of that skill like running that skill in an agent produced and then just show you how like how well that shit actually works yeah so there might be also like a big overlap with like also let's look for like if existing people are already benchmarked like if there's people already benchmarking this shit

https://skills.sh/

There are audits from these agents - which we can copy from the skills.sh registry 

GEN
SOCKET
SNYK

https://skills.sh/vercel-labs/skills/find-skills
This is like a really nice skill  Anyways, your goal is to kind of bootstrap the app. Well, first of all, let's bootstrap the exact functionality that we want to have, like the user stories, the rough layout of the page per skill. I guess specifically more like how are we going to organize this information? Let's also do the analysis of the competitors. Let's see how people are looking for skills on Twitter. 

https://github.com/openclaw/clawhub
```

## Clarification on user and taxonomy

```
The primary user is someone trying to find a good skill for what they're trying to do and see what the actual output from the skill would be and see comparisons against other skills. Most of the time, people would be entering something like, "Hey, what's the best document generation skill out there?" And then we should just give you the top one, explain why we chose it, and then we should give you a comparison table between skills in the same category

category is pretty narrowly defined - like notion reading / google docs reading is quite different - they are in the same category but like not the same thing

Maybe we can Also, explicitly distinguish between like you can kind of accomplish the same thing using these skills, but the infra will be different. Like for example, if it's an issue tracker, we can use Notion, we can use Linear, we can use Beads, we can use like some basically other like some different task managers 

but ultimately they're all for task tracking so there should be like a leveled like a tiered level to it as well so it's like what are what do people like the most for task tracking and it should essentially prescribe both the tool and the skill and i think it's more of a competition almost on the tool level and then there's the skill within the same tool so for example for agent browsing of the web or like for puppeteer testing there is going to be a same tool which is like just operating the browser or like the same platform more so but the skills are different so maybe we should also make that distinction pretty clear

also nice styling of the webiste 

https://mcpmarket.com/

 Another thing we should probably be detecting is if this particular skill is dead. So if it's been superseded or clearly is being outperformed by other skills, we will just archive it and we should also remove any references to that skill from like other from comparison tables 

Let's offer me another taxonomy and like, how do we organize the information and what information do we show? Again, we want this to be minimal, flat. At the same time, focus on the comparisons and focus on the real examples of using the skill and showing like when did we last try using the skill and showing the output from the skill. And also, this will not be ran on the server; this will just be ran literally locally on my machine every day. I will start an agent that will just run in a loop and just continuously compare these skills / benchmark them
```

## Leaner homepage and category structure

```
Let's try to make this even leaner. I think we can just have a flat list of all the skills in honestly I think we should just co-generate the entire website based on a like template so we would have some like let's create essentially one page comparing skills for agent browsing and we can do like like browser use approaches and then we can also use we can also have like iOS simulator use approaches and like Xcode builds we should definitely have like some related skills section Thank you I think for the homepage we almost want just like core section which will give you basically the core categories of skills that people are actually using. And... I'm almost thinking we basically just do the homepage and we just kind of show all of this research. Most of the results of the research on the homepage page, but then as we go into like a category, for example, web browsing, for example, Google suite, like, oh, can it edit the document? Can it just read the document? How does the authentication work? Is it official? Like what's the heartbeat on the commits? Any Twitter, any Twitter stuff. And I think we should add the hover. So as you hover on top of these skills, we should be able to show you like the key, like inside per skill And how does it bench against others in its category like what the rank within the others in this category for example if it like a if it's like a design skill then how does it rank against others in its category and as we go into how hot it is and as we go into the individual skill we will basically have like as we go into the category we will have like the comparison table and basically we should just show the results of our benchmarking And as we go to the individual skill, we should also probably show the benchmarking for that skill. So it comes down to like our script will roughly have to look at our skill registry, search on online if there's any like new submissions, like actually maybe not even search online, search online and also hit the API endpoints of the existing skill registries just to see if there like any new big skill we are missing Check Twitter for like recent big names who are tweeting about these skills and ideally also maybe comparing them pairwise or whatever or just saying like hey here's the meta skill. Thank you. you you
```

## Evidence-driven ranking and pipeline direction

```
Okay, realistically, I think in the beginning we won't be running these skills because it's kind of tricky to actually set up the test task for it. But I do think we want to see people, like we want to find people on the internet essentially comparing these to each other. we want to quote Twitter, we want to quote Reddit we want to quote blog posts and we want to backlink to them and ideally we actually want to find also like if they're like a reputable source so we would kind of rank the more reputable sources higher in this sense Thank you.I think even for structured data, we can just use Markdown files with the front matter for structured data. And we probably want to type-check this like structured header so we don't fuck this shit up. And I almost think for jobs and platforms, we kind of just don't even want to store any YAML crap. We will just show, we will just have like a Markdown file or something that we can render. And I think for the pipeline, like basically you or some other agent will be kind of executing against the research and, or like we should probably have a two-step process roughly. No, three-step process probably. We would have Discover, which is where we look for like new trending skills today on Twitter, on Reddit, and we also look for like any registry. Like we just kind of pull the registry top picks and see if we are missing, like if there's any new items on the top picks because we don't really care about, like, the bottom. We probably only care about, like, the top 100 skills on, like, the popular registries. And we just want to make sure we're not missing, like, the key ones, honestly. And we also just want to see what has happened since we've last, like, looked at it. We want to see some sort of changelog on the skill. Maybe we could even pull GitHub, but again, we don't even care for this. We'll just be pulling this into a gitignore temporary directory to just see what happened since we've last checked out this. And then we would have like, I guess, research for each category of the skills. And we probably only would want to start the research if we like haven't really, if there's like a major update to the skill or if somebody tweeted like, oh my God, this skill is now working so well, whatever. So there needs to be like some trigger to start researching a particular skill. So I guess we do discovery, then we do deep dive, like on the skills that need that, which initially is just going to be all. But again, we're just trying to write the prompt here. And next after the deep dive, we will do like, we will run the comparison thing, which will essentially generate the comparisons both for the platforms and for the jobs to be done. I think we can just run like a single comparison and we'll just kind of do both. And then finally, we will do the like, honestly, this same like, I don't know if it's good to call it comparison. We can just call it like aggregator or something, and it will just update the platforms, the jobs, and then the homepage as well. And then again, remember, we're trying to link actual resources of people trying the thing. And again, we probably want to recognize if like, oh, these are like they're famous, they have a lot of subscribers, or like the internet is already aware of their existence. Like they're kind of reputable in the community. Like for example, like Simon Wilson, I don't know, Steve Yags, whatever, like the creator of Claude Code, like official releases of companies, like these are all pretty high signal things. Sometimes also let's consider like not even a skill, like some things may just be literally natively done. So for example, for web testing, like we should also show like, hey, we can do web testing within Claude desktop app, for example, or within like the Cursor editor. So we also want to keep track of like kind of the job to be done doesn't necessarily need to be solved by the skill. I guess this can be tracked within the platform as well. So we can, yeah, maybe we can like for, yeah, because the platform will differ. Like if the platform itself natively provides the skill essentially, we can also, we should also track that 

I don't even think we need. Sure, I mean, we can add a very simple search, just kind of like string similarity search. We don't have to do anything too fancy. Ideally, we just search on the web page, like we don't even index it on the back end, none of that shit. I think tool platform we can have as first-class citizens because maybe tool platform, like they can actually cover decent ground. Also another interesting question is like how do you organize things? Like Google, for example, they have a shitload of products and they will have like separate skills for them, whatever. And they're kind of like I guess separate platforms and separate tools probably. Yeah, that's fine. Let's just treat them as separate tools and they will just appear as separate contenders within the job to be done 

And honestly, I think we can even do, since we're doing this, like we can even have the job of writing code as a kind of secondary section on the homepage. First, we'll just have a category and then we would have. Yeah, I'm not quite sure exactly what's a good layout. I think we need to just try it out, like try organizing this taxonomy and then see how it works 

I'm not sure what you mean by each narrow page, exactly one winner. Like, I think we're basically either looking at the scale or we're looking at a couple of different options and we just kind of rank them. So it should be in the table, like comparison should be pretty freaking clear 

For the first batch, I think we again will need to actually run the research, like the research agent, or I mean the discovery agent
```

## Refinement on search, comparisons, and CLIs

```
Okay, that's good. But for the pipeline, I don't know if tracking particular accounts is a good idea. I mean, I think we probably just want to search for hot skills, or maybe filter by post date, like from today or the past week. And we ideally want to be able to inline them—find a way to include the tweets, find a way to include the Reddit posts, find a way to quote people. And especially the juicy ones are when somebody compares a particular skill to another skill—pairwise comparison is extremely strong. Okay, "Rank" is a good name. Yeah, we should even compare the coding CLIs
```

## Stack and repo direction

```
OKAY lets persist this into the agents.md

Also, for each of these, I think we also need to decide on which infrastructure to publish the website on, because my understanding is we need some very simple engine 


---- 
heere is our stack of choice

Best Stack for a Beautiful Skillbench Website (2026)                                                
                                                                                                      
  The winning combo: Next.js + Tailwind CSS v4 + shadcn/ui                                            
                                                                  
  This is the de facto standard that every AI tool (Claude Code, Cursor, v0, Lovable, Bolt) generates
  the best output for. shadcn/ui especially shines because it's copy-paste components you own, not a
  dependency — perfect for opinionated design.

  Install the Claude Code frontend-design plugin

  This is the single biggest lever for beautiful output. It steers Claude away from "AI slop" (generic
   Inter fonts, purple gradients, cookie-cutter layouts):

  # Add the demo marketplace
  /plugin marketplace add anthropics/claude-code

  # Install the frontend-design plugin
  /plugin install frontend-design@anthropics-claude-code

  This gives Claude a ~400 token design system that forces:
  - Distinctive typography (Playfair Display, JetBrains Mono — not Inter/Arial)
  - High-contrast weight pairings (100/200 vs 800/900)
  - Theme-driven design (brutalist, retro-futuristic, luxury, etc.)
  - Motion as micro-interactions with staggered reveals
  - Atmospheric backgrounds instead of flat solid colors

---

We may want to actually delete or like, you know, recreate the repository with the Next bootstrapping shit. And I guess fuck the monorepo for now. It's just going to be a single Next.js app for now 

And I think for the skill, I think let's just install it in the 
.agents/skills/frontend-design ? or somthing

and add 

agents.md to the root 
and symlink claude.md -> points to agents.md :D
```

## Evidence requirements and promotional material

```
evidence?: EvidenceItem[];

NOT FUCKING OPTINAL BITCH

also did you update our terminology to Categories everywhere?

also i want the skills themselves be somehow easy to spot

And lets also add another thing to the mix - Bundles

which will track 'full setups' popular / trending twitter personas have - they should also reference skills in our registry

----

also NEVER trust the website itself, or clearly promotional material as a strong signal - it may be used as a reference for claimed stuff - but should be clearly marked as such

example:
Faros AI: Best AI Coding Agents for 2026 — Claude Code rated #1",
      372 +        url: "https://www.faros.ai/

like of fucking course faros is going to jack off to faros don't you fucking think???
```

## Change priority protocol

```
also when i tell you to change soemthing - prioritize

a) updatint the human log thing
b) updating our docs
c) finally making the changes acrrodgly

- respect this rule string from now

add this to agents.md top level
```

## Dead links, route cleanup, header dedup, screenshots, dates

```
screenshots still suck for products - like no one cares for hacker news screenshots!

AND STILL i have basically not seen any screenshots of products!

also artefacts / news whatever don't show up with dates - maybe you added that actually - but each thing we find needs to be tracked with time

also change jobs/ route - its outdated

also https://x.com/mcaborern - is no longer found - LIKE BITCH every fucking link - we MUST verify is not fucking dead before we reference it!!! It must be explicitly verified by the agent - using twitter tool for twitter stuff etc etc

also 2d header has duplication + extra space eating thing -

we should remove it and keep / CATEGORY in the header of the website itself

and lets continue pushing after every commit to prod
```

## QA agent overhaul: content quality, subagents, cross-tool feedback

```
modify qa agent to ensure the content of the page contains good info - does it look weird? does it have duplicative info? does it communicate what the product is about? encourage it to use subagents to verify various aspects independently - also use opus in the subagents, and ask to run codex cli too to get feedback
```

## Remove homepage slop: "Current surface" and "Process docs" sections, slim footer

```
THIS SHIT on the bottom - should be largely removed - fucking slop - current surface, process docs
footer with home cateogries etcetc - duplicative shit
```

Action: Removed "Current surface" and "Process docs" sections from homepage. Slimmed footer to single line — nav links already in header, mission already in hero. No duplicative content.

## Additional context from assistant responses that informed later notes

These were not user-authored, but they explain terms later referenced by the user:

```text
Proposed core entities:
- job
- platform
- skill
- source

Proposed pipeline stages:
- discover
- deep-dive
- rank
- publish

Proposed status model:
- active
- watch
- archived
```
