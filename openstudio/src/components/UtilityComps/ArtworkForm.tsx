import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  ArtworkFormData,
  ArtworkFormWithImages,
} from "../../interfaces/artwork";

type FormErrors = Partial<ArtworkFormData> & { general?: string };

interface ArtworkFormProps {
  initialData?: ArtworkFormWithImages;
  onSubmit: (
    formData: ArtworkFormData,
    imageFiles: (File | null)[]
  ) => Promise<void>;
}

function ArtworkForm({ initialData, onSubmit }: ArtworkFormProps) {
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    price: 1,
    quantity_for_sale: 1,
    is_for_sale: true,
    medium: "painting",
    material: "",
    width: 1,
    depth: 1,
    height: 1,
    weight: 1,
  });
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { artworks_images, ...formFields } = initialData;
      setFormData(formFields);
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "is_for_sale"
          ? value === "yes"
          : type === "number"
          ? value === ""
            ? 0
            : parseFloat(value)
          : value,
    }));
    console.log(`Field ${name} updated to:`, value); // Debug log
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFiles = [...selectedFiles];
    newFiles[index] = e.target.files ? e.target.files[0] : null;
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      console.log("Submitting form data:", formData); // Debug log
      await onSubmit(formData, selectedFiles);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        general: "Failed to submit the form. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={300}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Year Created</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Quantity for Sale</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="quantity_for_sale"
            value={formData.quantity_for_sale}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Is for Sale</label>
        <div className="control">
          <div className="select">
            <select
              name="is_for_sale"
              value={formData.is_for_sale ? "yes" : "no"}
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Medium</label>
        <div className="control">
          <div className="select">
            <select
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              required
            >
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="digital_art">Digital Art</option>
              <option value="photography">Photography</option>
              <option value="mixed_media">Mixed Media</option>
              <option value="printmaking">Printmaking</option>
              <option value="ceramics">Ceramics</option>
              <option value="textile">Textile Art</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Material(s)</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Dimensions (cm) and Weight (kg)</label>
        <div className="columns">
          <div className="column">
            <label htmlFor="width" className="label">
              Width (cm)
            </label>
            <input
              id="width"
              className="input"
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="depth" className="label">
              Depth (cm)
            </label>
            <input
              id="depth"
              className="input"
              type="number"
              name="depth"
              value={formData.depth}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="height" className="label">
              Height (cm)
            </label>
            <input
              id="height"
              className="input"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="weight" className="label">
              Weight (kg)
            </label>
            <input
              id="weight"
              className="input"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Images (up to 5)</label>
        {selectedFiles.map((file, index) => (
          <div key={index} className="file has-name is-fullwidth mb-2">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
              />
              <span className="file-cta">
                <span className="file-label">Choose image {index + 1}</span>
              </span>
              <span className="file-name">
                {file ? file.name : "No file chosen"}
              </span>
            </label>
          </div>
        ))}
      </div>

      {errors.general && <p className="help is-danger">{errors.general}</p>}

      <div className="field">
        <div className="control">
          <button type="submit" className="button is-primary">
            Submit Artwork
          </button>
        </div>
      </div>
    </form>
  );
}

export default ArtworkForm;
