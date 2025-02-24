// Fonction pour générer un nom de fichier unique pour une image
export function generateUniqueImageName(file) {
  const timestamp = new Date().getTime();
  const extension = file.name ? file.name.split('.').pop() : 'png';
  return `image_${timestamp}.${extension}`;
}

// Fonction pour convertir une image en URL de données
export function imageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Fonction pour stocker une image en base64
export const storeImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target.result
      const imageName = `img_${Date.now()}`
      localStorage.setItem(`image_${imageName}`, imageData)
      resolve(imageName)
    }
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

// Fonction pour récupérer une image stockée
export const getStoredImage = (imageName) => {
  return localStorage.getItem(`image_${imageName}`)
}

// Fonction pour supprimer une image stockée
export const removeStoredImage = (imageName) => {
  localStorage.removeItem(`image_${imageName}`)
}

// Fonction pour nettoyer les anciennes images
function clearOldImages() {
  const keys = Object.keys(localStorage);
  const imageKeys = keys.filter(key => key.startsWith('image_'));
  
  // Trier les images par date (du plus ancien au plus récent)
  imageKeys.sort((a, b) => {
    const timeA = parseInt(a.split('_')[1]);
    const timeB = parseInt(b.split('_')[1]);
    return timeA - timeB;
  });

  // Supprimer les 5 plus anciennes images
  for (let i = 0; i < Math.min(5, imageKeys.length); i++) {
    localStorage.removeItem(imageKeys[i]);
  }
}
