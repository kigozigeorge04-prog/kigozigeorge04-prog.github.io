/**
 * EaseMed OSCE Admin — Station Image Upload
 * ------------------------------------------
 * Vanilla JS module for the admin dashboard. Uploads an image to the
 * `osce-station-images` Storage bucket and writes the resulting public
 * URL onto the matching row in `osce_stations`.
 *
 * Requires: a global `sb` (Supabase client) already initialized and
 * accessible in scope, same as the rest of the admin dashboard.
 *
 * Usage in HTML:
 *   <input type="file" id="stationImageInput" accept="image/*">
 *   <div id="stationImagePreview"></div>
 *   <script src="admin_image_upload.js"></script>
 *   <script>
 *     initStationImageUpload({
 *       fileInputId: 'stationImageInput',
 *       previewContainerId: 'stationImagePreview',
 *       getStationContext: () => ({
 *         id: currentEditingStationId,   // numeric station id
 *         module: currentStationModule,  // e.g. 'peds'
 *         stationType: currentStationType // e.g. 'xray'
 *       }),
 *       onUploadComplete: (publicUrl) => {
 *         console.log('Image linked:', publicUrl);
 *       }
 *     });
 *   </script>
 */

function initStationImageUpload({
  fileInputId,
  previewContainerId,
  getStationContext,
  onUploadComplete
}) {
  const fileInput = document.getElementById(fileInputId);
  const previewContainer = document.getElementById(previewContainerId);

  if (!fileInput) {
    console.error(`[stationImageUpload] No element with id "${fileInputId}"`);
    return;
  }

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const context = getStationContext();
    if (!context || !context.id || !context.module || !context.stationType) {
      showStatus('Missing station context — select a station before uploading.', true);
      return;
    }

    // Basic validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showStatus('Please upload a JPG, PNG, or WebP image.', true);
      return;
    }
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      showStatus(`Image too large — keep it under ${maxSizeMB}MB.`, true);
      return;
    }

    showStatus('Uploading...', false);

    try {
      const ext = file.name.split('.').pop();
      const path = `${context.module}/${context.stationType}/${context.id}.${ext}`;

      // Upload (upsert so re-uploading the same station replaces the image)
      const { error: uploadError } = await sb.storage
        .from('osce-station-images')
        .upload(path, file, { upsert: true, cacheControl: '3600' });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: urlData } = sb.storage
        .from('osce-station-images')
        .getPublicUrl(path);

      const publicUrl = urlData.publicUrl;

      // Write it onto the station row
      const { error: updateError } = await sb
        .from('osce_stations')
        .update({ image_url: publicUrl })
        .eq('id', context.id);

      if (updateError) throw updateError;

      showStatus('Image uploaded and linked ✓', false);

      if (previewContainer) {
        previewContainer.innerHTML = `<img src="${publicUrl}" alt="Station image preview" style="max-width:100%;border-radius:8px;">`;
      }

      if (typeof onUploadComplete === 'function') {
        onUploadComplete(publicUrl);
      }
    } catch (err) {
      console.error('[stationImageUpload]', err);
      showStatus(`Upload failed: ${err.message || 'unknown error'}`, true);
    }
  });

  function showStatus(message, isError) {
    if (!previewContainer) return;
    const statusEl = document.createElement('div');
    statusEl.textContent = message;
    statusEl.style.color = isError ? '#d9534f' : '#4CAF50';
    statusEl.style.fontSize = '0.9rem';
    statusEl.style.marginTop = '4px';
    previewContainer.appendChild(statusEl);
  }
}

/**
 * Frontend rendering helper — for the actual candidate-facing OSCE view.
 * Handles the case where image_url is still null (image not uploaded yet)
 * without breaking the layout.
 */
function renderStationImage(imageUrl, altText = 'Clinical image') {
  if (!imageUrl) {
    return `<div class="station-image-placeholder">Image not yet available for this station</div>`;
  }
  return `<img src="${imageUrl}" alt="${altText}" class="station-image" loading="lazy">`;
}
