import * as React from "react";
import "./ingredients.scss";

export interface IIngredientsProps {
    ingredients: IIngredient[];
}

export class Ingredients extends React.Component<IIngredientsProps, any> {
    constructor(props: IIngredientsProps) {
        super(props);
    }

    render() {

        return <div>

                {this.props.ingredients.reduce((result,ingredient,i) => {

                    if (!ingredient.quantity) {
                        result.push(<div className="ingredient" key={i}><span className="name">{ingredient.name}</span></div>)
                    } else {
                        result.push(<div className="ingredient" key={i}>{ingredient.quantity} <span>{ingredient.unit}</span> <span className="name">{ingredient.name}</span></div>);
                    }

                    return result;
                },[])
                }
        </div>;
    }
}