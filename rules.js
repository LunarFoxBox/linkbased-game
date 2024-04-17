var foundKey = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if (choice.Interaction){
                this.handleInteraction(choice);
            }
            else this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
    handleInteraction(choice){
        this.engine.show(choice.Interaction.Text);

        // Check if the interaction is to retrieve a key
        if (choice.Interaction.Key){
            foundKey = true;
        }
        // Handles if the choice was a lock & key puzzle
        else if (choice.Interaction.Lock){
            let lock = choice.Interaction.Lock;
            if (foundKey){
                this.engine.show(lock.Success);
                this.engine.addChoice(lock.Complete.Text, lock.Complete);
            }
            else{
                this.engine.show(lock.Fail)
            }
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');