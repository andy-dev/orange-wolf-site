class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.string :sourcecode
      t.string :url
      t.attachment :image
      t.attachment :image2
      t.attachment :image3

      t.timestamps null: false
    end
  end
end
