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

        return (
                <div>
                    {this.props.ingredients.map((ingredient, i) => (
                        <div className="ingredient" key={i}>
                            {ingredient.quantity ? <span>{ingredient.quantity} {ingredient.unit}</span> : null}
                            <span className="name">{ingredient.name}</span>
                        </div>
                    ))}
                </div>
            )
    }
}