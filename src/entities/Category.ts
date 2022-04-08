import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("nested-set")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @TreeChildren()
    children: Category[]
    
    @TreeParent()
    parent: Category

}