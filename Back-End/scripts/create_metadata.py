"""def main():
    advanced_collectible = AdvancedCollectible[-1]
    number_of_advanced_collectibles = advanced_collectible.tokenCounter()
    print(f"You have created {number_of_advanced_collectibles} collectibles!")
    for token_id in range(number_of_advanced_collectibles):
        breed = get_breed(advanced_collectible.tokenIdToBreed(token_id))
        metadata_file_name = (f"./metadata/{network.show_active()}/{token_id}-{breed}.json")
    collectible_metadata = metadata_template
    if Path(metadata_file_name).exists():
        print(f"{metadata_file_name} already exists! Delete it to overwrite")
    else:
        print(f"Creating metadata file: {metadata_file_name}")
        collectible_metadata["name"] =  breed
        collectible_metadata["description"] = f"An adorable {breed} pup!"
        image_path = "./img/" + breed.lower().replace("_","-") + ".png"

        image_uri = None
        if os.getenv("UPLOAD_IPFS") == "true":
            image_uri = upload_to_ipfs(image_path)
        image_uri = image_uri if image_uri else breed_to_image_uri[breed]

        collectible_metadata["image"] = image_uri
        with open(metadata_file_name, "w") as file:
            json.dump(collectible_metadata, file)
        if os.getenv("UPLOAD_IPFS") == "true":
            upload_to_ipfs(metadata_file_name)"""