import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Accordion.css';
import { Collapsible, HorizontalLine, MinecraftText, ReactIcon } from 'components';

/*
* Draggable container with a collapsable portion underneath
*
* @param {string} props.title 	The title of the stats row
* @param {JSX} props.header 	JSX objects to place beside the title
* @param {JSX} props.children 	The contents of the collapsible area
*/
export function Accordion(props) {
	return (
		<Draggable key={props.title} draggableId={props.title} index={props.index}>
		{dProvided => (
			<Collapsible>
			{cProvided => (
				<div 
					className="py-1"
					ref={dProvided.innerRef}
					{...dProvided.draggableProps}>
					<div className="accordion">
						<div className="accordion-header px-2"> 
							<div 
								className="h-flex align-items-center flex-1 cursor-pointer overflow-hidden" 
								{...cProvided.collapseButtonProps}>
								<div className="py-2">
								<MinecraftText font="md">{props.title}</MinecraftText>
								</div>
								<div className="h-flex flex-1 justify-content-center px-3">
									{props.header}
								</div>
							</div>
							<button className="ml-2" {...dProvided.dragHandleProps}>
								<ReactIcon icon="MdDragHandle" clickable />
							</button>
						</div>
						<div {...cProvided.collapsibleProps}>
							<div className="accordion-body px-2">
								<HorizontalLine />
								{props.children ?
									props.children : 
									<div className="my-2">{`No stats to display for ${props.title}.`}</div>
								}
							</div>
						</div>
					</div>
				</div>
				)}
			</Collapsible>
			)}
		</Draggable>
		);
}