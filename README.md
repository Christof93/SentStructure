# Sentence Structure Visualisation

**SentStructure.js** is a d3.js extension that automatically creates visual representations of sentences. The data comes from structured input (JSON or CONLL). 
It is possible to visualise tokens, POS-tags, dependencies and word-alignments or any other relation that can be expressed in a similar representation.

This example shows a multilingual sentence where we have information about all these features:

![example sentence](https://gitlab.cl.uzh.ch/sparcling/SentStructure.js/uploads/2e55b8b8a7e062d1d74d3538c361fa29/Bildschirmfoto_2017-05-19_um_23.42.58.png)


Features can be displayed selectively or all at once. There are different possibilities to highlight parts of the visualisation.

![multilingual sentence example](https://gitlab.cl.uzh.ch/sparcling/SentStructure.js/uploads/179a7ad46c54e4059f4d372a88e752b4/Bildschirmfoto_2017-05-19_um_23.29.31.png)

## Using the demo app

If you don't want to integrate SentStructure into your own web application you can use the demo page and paste in some CONLL data. 
The application provides some basic interactivity and should be enough if you just want to look at a few sentences.

https://pub.cl.uzh.ch/projects/sparcling/SentStructureDemo/

This CONLL Snippet can get you started:
```
1	Meine	mein	PRON	PPOSAT	_	34354	DET	34353	1322	115	f	de	34457|34563|34660|34771|34850
2	Damen	Dame	NOUN	NN	_	34358	SUBJ	34354	1322	115	t	de	34457|34563|34660|34771|34772|34851	
3	und	und	CONJ	KON	_	34354	KON	34355	1322	115	t	de	34458|34564|34661	
4	Herren	Herr	NOUN	NN	_	34355	CJ	34356	1322	115	t	de	34459|34563|34662|34771|34772|34850|34851	
5	,	,	.	$,	_	34356	-PUNCT-	34357	1322	115	f	de	34460|34564|34665|34773|34852
6	lassen	lassen	VERB	VVFIN	_	0	ROOT	34358	1322	115	t	de	34461|34666|34668|34774|34775|34853	
7	Sie	Sie|sie	PRON	PPER	_	34365	SUBJ	34359	1322	115	t	de	_	
8	uns	wir	PRON	PRF	_	34365	OBJA	34360	1322	115	t	de	34462|34853
9	mit	mit	ADP	APPR	_	34365	PP	34361	1322	115	t	de	34466|34567|34669|34776	
10	diesem	dies	PRON	PDAT	_	34363	DET	34362	1322	115	t	de	34467|34568|34670|34777|34856
11	Thema	Thema	NOUN	NN	_	34361	PN	34363	1322	115	t	de	34468|34569|34671|34778|34857
12	nicht	nicht	PRT	PTKNEG	_	34365	ADV	34364	1322	115	t	de	34463|34565|34666|34668|34774
13	fortfahren	fortfahren	VERB	VVINF	_	34358	OBJI	34365	1322	115	t	de	34464|34566|34667|34775|34854
14	.	.	.	$.	_	34365	-PUNCT-	34366	1322	115	f	de	34469|34570|34672|34779|34858
```

## Install

Clone the repository to your source directory or just download the SentStructure.js file.

If you want to use SentStructure.js in your own webpage, just include the source file in your page like so:

```html
<script src="SentStructure.js/js/SentStructure.js"></script>
```

You will also have to import d3.js and Jquery:

```html
<script src="SentStructure.js/js/jquery.min.js"></script>
<script src="SentStructure.js/js/d3.min.js"></script>
```


## CONLL input

Let's see how you can visualize a sentence from CONLL input. You will use the function parseCONLL. 

parseCONLL() takes two arguments:

1. CONLL string
2. a mapping object which tells the parser which columns in your CONLL file refer to which relations

At the moment there are at most 6 columns that can be relevant. These are:

- type (the token text)
- id
- pos (pos text)
- dep (dependency relation text)
- dep_to (the token-id the dependency relation is pointing to)
- align (token ids of aligned tokens, separated by | if more than one)

Let's consider a CONLL file like this: 

```
1	Meine	mein	PRON	PPOSAT	_	34354	DET	34353	
2	Damen	Dame	NOUN	NN	_	34358	SUBJ	34354	
3	und	und	CONJ	KON	_	34354	KON	34355
...
```

We have the 'type' in column 1, 'id' column 6 and so on from that we can infer the mapping object. There is no alignment information.
```javascript
//basic setup
mapper={type:1,id:8,pos:3,dep:7,dep_to:6};

input=parseCONLL(conll_str, mapper);
// with this we can set up the visualisation
my_vis=SentStructure(input);
// set all the parameters you want to change. There is a list of parameters below. Only thing mandatory is the container for the visualisation.
my_vis.setBase({container:"#thats_where",ySpacing:300});
// The visualisation object is now set up and loaded you can use the ready function to declare what should happen after the data is loaded
my_vis.ready(function() {
    my_vis.drawGraphs();
    //done!
});

```
## JSON input

If you get your sentences out of a large database it might be easy to extract them in JSON format. In this case you don't need to parse it. Just make sure it has the proper formatting.

```javascript
input= {
    segments: {
        some_id: [
            {
                dep:"ROOT",
                lemma:"Herr",
                type:"Herr",
                pos:"NOUN",
                dep_to:12344,
                id:12345
            },
            {..},
            ...
        ],
        some_other_id:[..],
        ...
    },
    alignments:[ [id_1,id_2], [..,..], ...]
}

my_vis=SentStructure(input);
...
```
## Parameters

- left (distance to left end of the visualisation window)
- right (distance to right end of the visualisation window)
- top (distance to top end of the visualisation window)
- xSpacing (spacing between words)
- ySpacing (spacing between sentences)
- container (element which should contain the visualisation)
- font_size (font size of the tokens)
- hover_color (color of the token background on mousehover event)
- mark_color (token background color on toggle)
- important_color (token background color of tokens with the 'important' feature in the data)
- default_color (color of the token background)
- display_alignments (boolean whether to display alignment realtions or not)
- display_pos (boolean whether to display pos-tags or not)
- display_dependencies (boolean whether to display dependency relations or not)
- text_color (color of the token text)
- background_color (visualisation background color)
- link_opacity (opacity of the link lines)

## Functions

These are some useful functions of the SentStructure class:

- setBase(props)    set up the svg element and define where it should go. Use this only once for the same visualisation. 
- setProperties(props)    change some of the Properties listed above. The Stylesheet gets updated on each call.
- show_dependencies(node)    show all the dependencies that are connected to a certain node.
- hide_dependencies(node)    hide all the dependencie taht are connected to a certain node.
- addEvent(event,selector,callback)     add an event to some of the svg elements. Use html selectors to set the event targets. Define what should happen in case of the event in the callback function.
- drawGraphs()   collect everything and draw nodes,links and alignments

## SVG export

Since the underlaying library to generate the graphics, d3.js, uses svg to render, it is very easy to save the whole diagram to a svg file.

The function 'getDownloadURI()' generates a valid xml string from the svg element and returns a URI which you can use in the href attribute of a HTML <a> tag to download the file directly.

In the Demo App there is a download button.

The SVG allows you to edit the vector graphics further after download and scale to the desired size.
