[![Build Status](https://travis-ci.org/zindier/ngx-smart-table.svg?branch=master)](https://travis-ci.org/zindier/ngx-smart-table)

# Angular Smart Table Component

ngx-smart-table component is a forked project from [ng2-smart-table](https://github.com/akveo/ng2-smart-table) by [Akveo team](http://akveo.com/).

The main goal of this fork is to provide to this awesome component some news features, like filter with a date picker range.

### Demo

<a target="_blank" href="https://akveo.github.io/ng2-smart-table/">Live Demo</a>

![alt tag](src/assets/img/demo.gif)

## Installation

The library is available as npm package, so all you need to do is to run the following command:

```
npm install --save ngx-smart-table
```

This command will create a record in your `package.json` file and install the package into the npm modules folder.

## Minimal Setup Example

First thing you need to do is to import the ng2-smart-table directives into your component.

```

import { Ng2SmartTableModule } from 'ngx-smart-table';

```

Then register it by adding to the list of directives of your module:

```
// ...

@NgModule({
  imports: [
    // ...
    
    Ng2SmartTableModule,
    
    // ...
  ],
  declarations: [ ... ]
})
// ...
```

Now, we need to configure the table and add it into the template. The only <strong>required</strong> setting for the component to start working is a columns configuration.
Let's register <i>settings</i> property inside of the component where we want to have the table and configure some columns [Settings documentation](https://akveo.github.io/ng2-smart-table/#/documentation):
    
```
settings = {
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Full Name'
    },
    username: {
      title: 'User Name'
    },
    email: {
      title: 'Email'
    }
  }
};
```

Finally let's put the ng2-smart-table component inside of the template:

```
// ...

@Component({
  template: `
    <ng2-smart-table [settings]="settings"></ng2-smart-table>
  `
})
// ...
```
At this step you will have a minimal configured table. All functions are available by default and you don't need to configure them anyhow, so now you can add/edit/delete rows, sort or filter the table, etc.
 
Still it seems like something is missing... Right, there is no data in the table by default. To add some, let's create an array property with a list of objects in the component. Please note that object keys are the same as in the columns configuration.

```
data = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv"
  },
  
  // ... list of items
  
  {
    id: 11,
    name: "Nicholas DuBuque",
    username: "Nicholas.Stanton",
    email: "Rey.Padberg@rosamond.biz"
  }
];
```

And pass the data to the table:

```
// ...

@Component({
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  `
})
// ...
```

Now you have some data in the table.

#### Date picker range filter example
 
 ```
 settings = {
   columns: {
     id: {
       title: 'ID'
     },
     name: {
       title: 'Full Name'
     },
     username: {
       title: 'User Name'
     },
     date: {
       title: 'Date',
       filter: {
         type: 'daterange',
         config: {
           daterange: {
             format: 'mm/dd/yyyy',
         },
       }
     }
   }
 };
 ```
 
## Further Documentation
Installation, customization and other useful articles: https://akveo.github.io/ng2-smart-table/

## Features
* Local data source (Server/API DataSource is on its way)
* Filtering
* Sorting
* Pagination
* Inline Add/Edit/Delete
* Flexible event model

## License
[MIT](LICENSE.txt) license.

## Special thanks to our awesome contributors!

[Akveo team](http://akveo.com/)

### From Zindier Group

Enjoy :metal:
We're always happy to hear your feedback!
